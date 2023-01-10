// https://share.thecoder.live/show/intense-defensive-bud/

import { AsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import {
  BASE_URL, STORAGE_KEY
} from "../config/constants";
import { width, height } from '../config/layout';

import {
  useDispatch,
  useSelector
} from 'react-redux';
import * as TopicActions from '../actions/Topic.actions'; 

const item = {
    "id": "c0ff7e13-60c5-42ae-a811-064026c631cd",
    "terafac_logo": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/Terafac-logo.png"
}


function SignupScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

    const dispatch = useDispatch();

    const save = async (param) => {
        try {
          const key = await AsyncStorage.setItem(STORAGE_KEY, param)
        } catch (e) {
          console.error("Can't Load Key")
        }
      }

    const handleEmailChange = text => setEmail(text)

    const handlePasswordChange = text => setPassword(text)
    
    const handleConfirmChange = text => setConfirm(text)

    const navigate = (screen) => {
        props.navigation.navigate(screen)
    }

    const onPress = async (props) => {
        try {
          const response = await fetch(BASE_URL + "api/v1/rest-auth/registration/", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: email,
              password1: password,
              password2: confirm
            })
          });
    
          const json = await response.json();
    
          if ("status" in response && response.status < 400 && "key" in json) {
            // console.log("SignUpScreen response json", json)
            setEmail('')
            setPassword('')
            setConfirm('')
            setError('')

            // console.log("LOGIN onPress", json.key)
            await save(json.key);
            dispatch(TopicActions.saveAuthToken(json.key)).then((result) => props.navigation.navigate("TopicListScreen"))
          } else {
            // console.log("SignUpScreen response json", json)
            setError(Object.values(json))
            setPassword('')
            setConfirm('')
          }
        } catch (e) {
            setError(e.message)
        }
      };


    return (
      <ScrollView style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
        <View style={styles.container} >
            <View style={styles.main_view}>
            <TouchableOpacity onPress={() => props.navigation.navigate("LandingScreen")}> 
              <Image
                style={styles.terafac_logo}
                source={{uri: item.terafac_logo}}
                resizeMode="contain"
            />
            </TouchableOpacity>
            <View style={styles.center_view}>
                <TextInput placeholderTextColor="#9C9C9C" style={styles.email} placeholder={'Email'} value={email} onChangeText={handleEmailChange}/>
                <TextInput placeholderTextColor="#9C9C9C" style={styles.password} placeholder={'Set Password'} value={password} onChangeText={handlePasswordChange} secureTextEntry={true}/>
                <TextInput placeholderTextColor="#9C9C9C" style={styles.password} placeholder={'Confirm Password'} value={confirm} onChangeText={handleConfirmChange} secureTextEntry={true}/>
                <View style={styles.forget_password}>
                    <Text style={{fontSize: 12}}>password must contain: 1 lowercase letter, 1 uppercase, 1 symbol</Text>
                </View>        
                <TouchableOpacity onPress={onPress}>
                <View style={styles.login}>
                    <Text style={{fontSize: 16}}>Signup</Text>
                </View>
                </TouchableOpacity>
                {error && <Text style={styles.error}>{error}</Text>}
                <View style={styles.suggestion}>
                    <Text style={{fontSize: 12}}>Already a user?</Text>
                </View>
                <TouchableOpacity onPress={() => navigate("LoginScreen")}>
                <View style={styles.sign_up}>
                    <Text style={{fontSize: 16}}>Login</Text>
                </View>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </ScrollView>
    )
}


export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: 'none',
    backgroundColor: 'white'
  },
  terafac_logo: {
    width: 18*width/100,
    height: 16*height/100,
    alignSelf: 'flex-start',
    marginTop: 2,
    marginLeft: 2
  },
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#19BEE7',
    width: 60*width/100,
    paddingVertical: 15,
    marginTop: 40,
    borderRadius: 8
  },
  sign_up: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#19BEE7',
    width: 60*width/100,
    paddingVertical: 15,
    marginTop: 8,
    borderRadius: 8
  },
  email: {
    backgroundColor: 'white',
    marginVertical: 3,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    paddingHorizontal: 6,
    paddingVertical: 8,
    width: 82*width/100,
    fontWeight: '400',
    fontSize: 17
  },
  password: {
    backgroundColor:'white',
    marginVertical: 3,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    paddingHorizontal: 6,
    paddingVertical: 8,
    width: 82*width/100,
    fontWeight: '400',
    fontSize: 17
  },
  error: {
    alignSelf: 'center',
    textAlign:'center',
    color:'red',
    fontSize: 12,
    marginVertical: 5,
  },
  forget_password: {
    flex:1,
    textAlign:'center',
    color:'white',
    marginVertical: 5,
  },
  suggestion: {
    textAlign:'center',
    color:'white',
    marginTop: 35,
  },
  main_view: {
    flex: 0.7,
    width: 100*width/100,
    padding: 5,
    justifyContent: 'space-between'
  },
  center_view: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12*height/100
  }
});
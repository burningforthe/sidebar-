// https://share.thecoder.live/show/intense-defensive-bud/

import { AsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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


function LoginScreen(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

  const navigate = (screen) => {
    props.navigation.navigate(screen)
  }

  const onPress = async () => {
    try {
      const response = await fetch(BASE_URL + "api/v1/rest-auth/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const json = await response.json();

      if ("status" in response && response.status < 400 && "key" in json) {
        // console.log("LoginScreen response json", json)
        setEmail('')
        setPassword('')
        setError('')

        // console.log("LOGIN onPress", json.key)
        await save(json.key);
        dispatch(TopicActions.saveAuthToken(json.key)).then((result) => props.navigation.navigate("TopicListScreen"))
      } else {
        // console.log("LoginScreen response json", json)
        setError(Object.values(json))
        setPassword('')
      }
    } catch (e) {
      setError(e.message)
    }
  };


  return (
    <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
      <View style={styles.container} >
        <View style={styles.main_view}>
          <TouchableOpacity onPress={() => props.navigation.navigate("LandingScreen")}>
            <Image
              style={styles.terafac_logo}
              source={{ uri: item.terafac_logo }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.center_view}>
            <TextInput placeholderTextColor="#9C9C9C" style={styles.email} placeholder={'Email'} value={email} onChangeText={handleEmailChange} />
            <TextInput placeholderTextColor="#9C9C9C" style={styles.password} placeholder={'Password'} value={password} onChangeText={handlePasswordChange} />
            <TouchableOpacity onPress={() => navigate('ForgetPasswordScreen', {
              email: email
            })} style={styles.forget_password}>
              <Text style={{ fontSize: 12 }}>Forget Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.login} onPress={onPress}>
              <Text style={{ fontSize: 16 }}>Login</Text>
            </TouchableOpacity>

            {error && <Text style={styles.error}>{error}</Text>}
            <View style={styles.suggestion}>
              <Text style={{ fontSize: 12 }}>Don't have an account?</Text>
            </View>

            <TouchableOpacity style={styles.sign_up} onPress={() => props.navigation.navigate("SignupScreen")}>
              <Text style={{ fontSize: 16 }}>Sign Up</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </ScrollView>
  )
}


export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  main_view: {
    flex: 0.7,
    width: 100 * width / 100,
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  terafac_logo: {
    width: 18 * width / 100,
    height: 16 * height / 100,
    alignSelf: 'flex-start',
    marginTop: 2,
    marginLeft: 2
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60 * width / 100,
    paddingVertical: 15,
    marginTop: 40,
    borderRadius: 8,
    backgroundColor: '#19BEE7',
  },
  sign_up: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19BEE7',
    width: 60 * width / 100,
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
    width: 82 * width / 100,
    fontWeight: '400',
    fontSize: 17
  },
  password: {
    backgroundColor: 'white',
    marginVertical: 3,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    paddingHorizontal: 6,
    paddingVertical: 8,
    color: '#9C9C9C',
    width: 82 * width / 100,
    fontWeight: '400',
    fontSize: 17
  },
  error: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'red',
    fontSize: 12,
    marginVertical: 5,
  },
  forget_password: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    marginVertical: 5,
  },
  suggestion: {
    textAlign: 'center',
    color: 'white',
    marginTop: 35,
  },
  center_view: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12 * height / 100,
    backgroundColor: 'white',
  }
});
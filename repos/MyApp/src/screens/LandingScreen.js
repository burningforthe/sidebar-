//https://share.thecoder.live/show/examine-camera-difficulty/

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { width, height } from '../config/layout';
import { useNavigation } from '@react-navigation/native';

const item =  {
    "id": "914638a0-5934-4b8e-9e3c-e24a9182b816",
    "terafac_logo": "https://the-coder.s3.ap-south-1.amazonaws.com/terafac-images/RigsV3.2_Overview.png"
}


function LandingScreen(props){
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.main_section}>
        <Image
          style={styles.terafac_logo}
          source={{uri: item.terafac_logo}}
          resizeMode="contain"
        />
        <View style={styles.button_view}>
          <TouchableOpacity style={styles.login} onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={{fontSize: 16}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.login} onPress={() => navigation.navigate("SignupScreen")}>
              <Text style={{fontSize: 16}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LandingScreen;

const styles = StyleSheet.create({
  terafac_logo: {
    width: width,
    height: 0.6 * width,
    marginVertical: 0
  },
  login: {
    flex:1,
    padding:10,
    textAlign:'center',
    backgroundColor:'#1ACDA5',
    color:'white'
  },
  sign_up: {
    flex:1,
    padding:10,
    margin: 5,
    textAlign:'center',
    backgroundColor:'#1ACDA5',
    color:'white'
  },
  button_view: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 20
  },
  login: {
    backgroundColor: '#19BEE7',
    paddingHorizontal: 33,
    paddingVertical: 14,
    marginVertical: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_section: {
   display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
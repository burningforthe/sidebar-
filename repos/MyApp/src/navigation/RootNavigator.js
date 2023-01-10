// import React from 'react';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import SwitchScreen from '../screens/SwitchScreen';
// import LoginStack from './LoginStack';
// import WelcomeStack from './WelcomeStack';


// const Switch = createSwitchNavigator(
//     {
//       AuthLoading: SwitchScreen,
//       App: LoginStack,
//       Auth: WelcomeStack,
//     },
//     {
//       initialRouteName: 'Auth',
//     }
//   )

// const AppNav = createAppContainer(
//     Switch
// )


// const RootNavigator = () => <AppNav />

// export default RootNavigator

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//import LandingScreen from '../screens/LandingScreen';
import NewLandingScreen from '../screens/NewLandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';

// import MainScreens from '../screens/NewWelcomeScreen';

import NewWelcomeScreen from '../screens/NewWelcomeScreen';
import TopicListScreen from '../screens/TopicListScreen';
import TaskListScreen from '../screens/TaskListScreen';
import TaskScreen from '../screens/TaskScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';


import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const AuthStack = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#9AC4F8",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",

      }}
    >
      <Stack.Screen name="NewLandingScreen" component={NewLandingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
    </Stack.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#9AC4F8",
        },
        headerTintColor: "white",
        headerBackTitle: "Back",

      }}
    >
      <Stack.Screen name="NewWelcomeScreen" component={NewWelcomeScreen} /> 
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* <Stack.Screen name="TopicListScreen" component={TopicListScreen} />
      <Stack.Screen name="NewWelcomeScreen" component={NewWelcomeScreen} />  
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
      <Stack.Screen name="TaskScreen" component={TaskScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
    </Stack.Navigator>
  )
}

const RootNavigation = () => {
  const token = useSelector(state => state.topic.token)
  return (
    <NavigationContainer>
      {
        token === null ?
          <AuthStack /> : <AppStack />
      }
    </NavigationContainer>
  )

}

export default RootNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
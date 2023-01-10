import React from 'react';
import { Platform, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Root = createStackNavigator()

const LogoTitle = (props) => {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../../assets/icon.png')}
    />
  );
}

const LeftHeader = (props) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate(props.nav)}>
      <Text style={{ color: 'white', paddingLeft: 20 }}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const screenOptions = ({ route }) => ({
  headerTitle: (props) => <LogoTitle {...props} />,
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTintColor: 'black',
  tabBarActiveTintColor: 'whitesmoke',
  tabBarInactiveTintColor: 'grey',
  tabBarStyle: { backgroundColor: 'black', height: Platform.OS === 'ios' ? 80 : 60 },
  title: ''
})

const options = {


}

const LoginStack = () => (
  <NavigationContainer>
    <Root.Navigator
      initialRouteName="LandingScreen"
      screenOptions={{
        headerShown: false,
        headerMode: 'screen',
        headerStyle: { backgroundColor: 'tomato' },
        title: null,
        cardOverlayEnabled: true,
        cartStyle: { flex: 1 },
        animationEnabled: true,
        gestureEnabled: true
      }}
    >
      <Root.Screen name="LandingScreen" component={LandingScreen} />
      <Root.Screen name="LoginScreen" component={LoginScreen} />
      <Root.Screen name="SignupScreen" component={SignupScreen} />
    </Root.Navigator>
  </NavigationContainer>
);

export default LoginStack;

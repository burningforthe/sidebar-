import React from 'react';
import { Platform, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import NewWelcomeScreen from '../screens/NewWelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import TopicListScreen from '../screens/TopicListScreen';
import TaskListScreen from '../screens/TaskListScreen';
import TaskScreen from '../screens/TaskScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

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

const WelcomeStack = () => (
  <NavigationContainer>
    <Root.Navigator
      initialRouteName="NewWelcomeScreen"
      screenOptions={{
        headerShown: false,
        headerMode: null,
        title: null,
        cardOverlayEnabled: true,
        cartStyle: { flex: 1 },
        animationEnabled: true,
        gestureEnabled: true
      }}
    >
      <Stack.Screen name="NewWelcomeScreen" component={NewWelcomeScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Root.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Root.Screen name="TopicListScreen" component={TopicListScreen} />
      <Root.Screen name="TaskListScreen" component={TaskListScreen} />
      <Root.Screen name="TaskScreen" component={TaskScreen} />
      <Root.Screen name="ProfileScreen" component={ProfileScreen} />
    </Root.Navigator>
  </NavigationContainer>
);

export default WelcomeStack;

import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import AppView from './src'



export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    _loadResourceAsync()
    .then(() => _handleFinishLoading())
    .catch((e) => console.log(e))
  },[])

  const _loadResourceAsync = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }

    Promise.all([
      Asset.loadAsync([

      ]),
      Font.loadAsync([

      ])
    ])
    .then(() => Promise.resolve())
    .catch((e)=>Promise.reject(e))
  }

  const _handleFinishLoading = async () => {
    setLoading(false)
    await SplashScreen.hideAsync();
  }

  if(loading){
    return(
      null
    )
  }
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar style="auto" />}
          <AppView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
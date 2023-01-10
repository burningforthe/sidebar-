import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

import { STORAGE_KEY } from '../config/constants';
import { colors } from '../config/theme';


function SwitchScreen(props) {
    useEffect(() => {
        _bootstrapAsync();
    }, []);

  // Fetch the token from storage then navigate to our appropriate place
  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem(STORAGE_KEY);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
    return (
      <View style={styles.containerFull}>
        <ActivityIndicator
          size="large"
          color={colors.tintColor}
        />
      </View>
    );
  }

export default SwitchScreen;  

const styles = StyleSheet.create({
  containerFull: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

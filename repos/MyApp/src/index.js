import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import RootNavigator from './navigation/RootNavigator';
import withProvider from './redux/withProvider';

const AppView = () => {
    return(
        <ActionSheetProvider>
        <View style={styles.container}>
          <RootNavigator />
        </View>
      </ActionSheetProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
})

export default withProvider(AppView);
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { Spinner } from './src/components/common';
import AppNavigator from './src/navigation/AppNavigator';
import User from './src/db/User';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  async componentWillMount() {
    console.log(process.env.FIREBASE_API_KEY);
    var fbConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: 'react-native-local-storage.firebaseapp.com',
      databaseURL: 'https://react-native-local-storage.firebaseio.com',
      projectId: 'react-native-local-storage',
      storageBucket: 'react-native-local-storage.appspot.com',
      messagingSenderId: '654684231418',
    };
    firebase.initializeApp(fbConfig);

    const user = await User.loginAnonymous();
    this.setState({'loggedIn':true})
  }

  render() {
    if (this.state.loggedIn) {
      return <AppContainer />;
    } else {
      return (
        <View style={styles.container}>
          <Spinner />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});

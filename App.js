import React from 'react';
import { createAppContainer } from 'react-navigation';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/redux/reducers';
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

    console.log('checking if user is authed');
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        console.log('user is loggeded in');
      } else {
        await User.loginAnonymous();
      }
      this.setState({ loggedIn: true });
    });
  }

  render() {
    let viewLoaded = (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
    
    if (this.state.loggedIn) {
      viewLoaded = <AppContainer />;
    }

    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        {viewLoaded}
      </Provider>
    );

    if (this.state.loggedIn) {
      return (
        <Provider
          store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}
        >
          <AppContainer />
        </Provider>
      );
    } else {
      return (
        <Provider
          store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}
        >
          <View style={styles.container}>
            <Spinner />
          </View>
        </Provider>
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

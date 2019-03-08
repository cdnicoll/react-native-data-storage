import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import firebase from 'firebase';
import UserForm from './src/components/UserForm';
import { CardSection, Card, Spinner, Button } from './src/components/common';
import Users from './src/db/Users';

export default class App extends React.Component {
  mockData = [
    { id: 1, name: 'Sarah', age: 20 },
    { id: 2, name: 'Sam', age: 33 },
    { id: 3, name: 'Wendy', age: 29 },
    { id: 4, name: 'Cody', age: 34 },
  ];

  state = {
    isLoggedIn: false,
    employees: [],
  };

  async componentWillMount() {
    var fbConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: 'react-native-local-storage.firebaseapp.com',
      databaseURL: 'https://react-native-local-storage.firebaseio.com',
      projectId: 'react-native-local-storage',
      storageBucket: 'react-native-local-storage.appspot.com',
      messagingSenderId: '654684231418',
    };
    firebase.initializeApp(fbConfig);
    try {
      console.log('signing the user');
      const user = await this.signInUser();
      console.log(`user is signed in`);
      this.setState({ isLoggedIn: true });
      console.log('fetching employees...');
      const employees = await Users.fetch();
      console.log("got them!")
      this.setState({ employees });
    } catch (err) {
      console.log(err);
    }
  }

  signInUser = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInAnonymously()
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

   onButtonPress = async() => {
    const employees = await Users.fetch();
    console.log("got them!")
    this.setState({ employees });
  }

  renderUsers() {
    const { employees } = this.state;
    if (!employees) return;

    return Object.keys(employees).map(employee => {
      return (
        <CardSection key={employee}>
          <Text>
            Name: {employees[employee].name} Age: {employees[employee].age}
          </Text>
        </CardSection>
      );
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <ScrollView style={styles.container}>
          <UserForm />
          <CardSection>
          <Button onPress={this.onButtonPress}>Update Employee List</Button>
          </CardSection>
          <Card>{this.renderUsers()}</Card>
        </ScrollView>
      );
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

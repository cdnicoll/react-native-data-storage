import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import firebase from 'firebase';
import EmployeeForm from '../EmployeeForm';
import { CardSection, Card, Spinner, Button } from '../common';
import User from '../../db/User';
import Employees from '../../db/Employees';

class EmployeeScreen extends React.Component {
  state = {
    isLoggedIn: false,
    employees: [],
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
    try {
      const user = await User.loginAnonymous();
      this.setState({ isLoggedIn: true });
      const employees = await Employees.fetch();
      this.setState({ employees });
    } catch (err) {
      console.log(err);
    }
  }

    updateToPerminantAccountPress = async () => {
    User.updateToPerminantAccount({'email':'test@test.com', 'password':'tester'})
  };

  updateAccount() {
    // check if account should update
    const isAccountAnonymous = User.isAccountAnonymous();
    if (isAccountAnonymous) {
      return <Button onPress={this.updateToPerminantAccountPress}>Convert Account</Button>;
    }
  }

  refreshButtonPress = async () => {
    const employees = await Employees.fetch();
    this.setState({ employees });
  };

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
    console.log(this.state);
    if (this.state.isLoggedIn) {
      return (
        <ScrollView style={styles.container}>
          <EmployeeForm />
          <Card>
            <CardSection style={{ flex: 1, flexDirection: 'column' }}>
              <Button onPress={this.refreshButtonPress}>Refresh Employee List</Button>
              {this.updateAccount()}
            </CardSection>
          </Card>
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

export default EmployeeScreen;

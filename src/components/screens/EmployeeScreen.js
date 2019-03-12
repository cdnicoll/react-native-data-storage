import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
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
    try {
      const employees = await Employees.fetch();
      this.setState({ employees });
    } catch (err) {
      console.log(err);
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
    if (User.isLoggedIn()) {
      return (
        <ScrollView style={styles.container}>
          <EmployeeForm />
          <Card>
            <CardSection style={{ flex: 1, flexDirection: 'column' }}>
              <Button onPress={this.refreshButtonPress}>Refresh Employee List</Button>
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

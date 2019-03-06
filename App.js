import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import UserForm from './src/components/UserForm';
import { CardSection, Card } from './src/components/common';

export default class App extends React.Component {
  mockData = [
    { id: 1, name: 'Sarah', age: 20 },
    { id: 2, name: 'Sam', age: 33 },
    { id: 3, name: 'Wendy', age: 29 },
    { id: 4, name: 'Cody', age: 34 },
  ];

  state = {
    name: '',
    age: undefined,
  };

  onNameChange = text => {
    this.setState({ name: text });
  };

  onAgeChange = text => {
    this.setState({ age: text });
  };

  onButtonPress = () => {
    console.log(this.state.name, this.state.age);
  };

  renderUsers() {
    return this.mockData.map(user => {
      return (
        <CardSection key={user.id}>
          <Text>Name: {user.name} Age: {user.age}</Text>
        </CardSection>
      );
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <UserForm
          onNameChange={this.onNameChange.bind(this)}
          onAgeChange={this.onAgeChange.bind(this)}
          onButtonPress={this.onButtonPress.bind(this)}
        />
        <Card>{this.renderUsers()}</Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Card, CardSection, Button } from './src/components/common';

export default class App extends React.Component {
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

  render() {
    return (
      <View style={styles.container}>
        <Card>
          <CardSection>
            <Input
              label='Name'
              placeholder='Name'
              onChangeText={this.onNameChange.bind(this)}
              value={this.state.name}
            />
          </CardSection>
          <CardSection>
            <Input
              label='Age'
              placeholder='20'
              onChangeText={this.onAgeChange.bind(this)}
              value={this.state.age}
            />
          </CardSection>
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>Save</Button>
          </CardSection>
        </Card>
      </View>
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

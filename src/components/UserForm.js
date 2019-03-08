import React from 'react';
import faker from 'Faker';
import Users from '../db/Users';
import { Input, Card, CardSection, Button } from './common';

class UserForm extends React.Component {
  state = {
    name: '',
    age: '',
  };

  onButtonPress = () => {
    console.log('creating user');
    Users.create({ name: this.state.name, age: this.state.age });
    this.setState({
      name: '',
      age: '',
    });
  };

  onFakeDataPress = () => {
    const name = faker.Name.findName();
    const age = faker.random.number(80);
    this.setState({ name, age });
  };

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label='Name'
            placeholder='Name'
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
        </CardSection>
        <CardSection>
          <Input
            label='Age'
            placeholder='20'
            onChangeText={age => this.setState({ age })}
            value={String(this.state.age)}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.onButtonPress}>Save</Button>
          <Button onPress={this.onFakeDataPress}>Fake Data</Button>
        </CardSection>
      </Card>
    );
  }
}

export default UserForm;

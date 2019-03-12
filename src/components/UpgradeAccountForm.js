import React from 'react';
import { View, Text } from 'react-native';
import { Input, Card, CardSection, Button } from './common';
import User from '../db/User';

class UpgradeAccountForm extends React.Component {
    state = {
        email: '',
        password: ''
    }
  updateToPerminantAccountPress = async () => {
    User.updateToPerminantAccount({
      email: this.state.email,
      password: this.state.password,
    });
  };

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label='Email'
            placeholder='Email'
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </CardSection>
        <CardSection>
          <Input
            label='Password'
            placeholder='password'
            onChangeText={password => this.setState({ password })}
            value={String(this.state.password)}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.updateToPerminantAccountPress}>
            Convert Account
          </Button>
          <Button onPress={this.updateToPerminantAccountPress}>
            Login
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default UpgradeAccountForm;

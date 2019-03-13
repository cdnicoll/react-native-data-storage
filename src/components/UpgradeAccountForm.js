import React from 'react';
import { View, Text } from 'react-native';
import { Input, Card, CardSection, Button } from './common';
import User from '../db/User';

class UpgradeAccountForm extends React.Component {
  state = {
    email: "Test@test.com",
    password: "Tester",
  };

  updateToPerminantAccountPress = async () => {
    try {
      await User.linkToEmailPassAccount({
        email: this.state.email,
        password: this.state.password,
      });
      console.log(User.isLoggedIn() ? true : false);
    } catch (err) {
      console.log(err);
    }
    
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
            Link Account
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default UpgradeAccountForm;

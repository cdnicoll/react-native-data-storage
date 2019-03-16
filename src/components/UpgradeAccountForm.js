import React from 'react';
import { View, Text } from 'react-native';
import { Input, Card, CardSection, Button } from './common';
import { RkButton, RkText, RkTextInput } from 'react-native-ui-kitten';
import User from '../db/User';
import { UtilStyles } from '../styles/styles';

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
    
   console.log(this.state);
    
  };

  render() {
    return (
      <View style={UtilStyles.section}>
        <RkText rkType='header'>Login</RkText>
        <View style={UtilStyles.rowContainer}>
          <View style={{ flex: 1 }}>
            <RkTextInput
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Login'
              clearButtonMode='always'
              onChangeText={email => this.setState({ email })}
            />
            <RkTextInput
              secureTextEntry={true}
              placeholder='Password'
              clearButtonMode='always'
              onChangeText={password => this.setState({ password })}
            />
            <RkButton
              rkType='success stretch'
              onPress={this.updateToPerminantAccountPress}
            >
              Login
            </RkButton>
          </View>
        </View>
      </View>
    );
  }
}

export default UpgradeAccountForm;

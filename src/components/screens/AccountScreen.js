import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RkButton, RkText, RkTextInput } from 'react-native-ui-kitten';
import { Card, CardSection, Button } from '../common';
import User from '../../db/User';
import UpgradeAccountForm from '../UpgradeAccountForm';
import { UtilStyles } from '../../styles/styles';
import { ScrollView } from 'react-native-gesture-handler';

class AccountScreen extends React.Component {
  state = {
    attemptingLogin: false,
  };

  debugCurrentUser = () => {
    console.log(User.getUser());
  };

  onLoginPress = () => {
    console.log('login');
    this.setState({ attemptingLogin: true });
    // check if account already 
  };

  renderSignoutButton = () => {
    return (
      <View style={UtilStyles.section}>
      <View style={UtilStyles.rowContainer}>
        <View style={{ flex: 1 }}>
          <RkButton
            rkType='danger stretch'
            onPress={this.onLoginPress}
          >
            Signout
          </RkButton>
        </View>
      </View>
    </View>
    )
  }

    // attempt to login user
    // if they have not linked account
    //    show button to link account
    // if they have linked account
    //    hide login form

  render() {
    if (User.isAccountAnonymous) {
    return (
      <ScrollView style={UtilStyles.container}>
        <UpgradeAccountForm />
      </ScrollView>
    );
    } else {
      <ScrollView style={UtilStyles.container}>
        {this.renderSignoutButton()}
      </ScrollView>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  anonymousAccount: {
    color: '#E14C67',
  },
  perminantAccount: {
    color: '#4BF2A1',
  },
});

export default AccountScreen;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, CardSection, Button } from '../common';
import User from '../../db/User';
import UpgradeAccountForm from '../UpgradeAccountForm';

class AccountScreen extends React.Component {
  debugCurrentUser = () => {
    console.log(User.getUser());
  };

  unlinkEmailPass = async () => {
    try {
      await User.signout();
    //await User.unlinkAccount();
    //await User.loginAnonymous();
    } catch(err) {
      console.log(err);
    }
  }

  renderAccountStatus = () => {
    const isAccountAnonymous = User.isAccountAnonymous();
    if (isAccountAnonymous) {
      return (
        <View>
          <Card>
            <CardSection>
              <Text style={styles.anonymousAccount}>
                The account is anonymous
              </Text>
            </CardSection>
          </Card>
          <UpgradeAccountForm />
        </View>
      );
    }
    return (
      <Card>
        <CardSection>
          <Text style={styles.perminantAccount}>The account is perminant</Text>
        </CardSection>
        <CardSection>
        <Button onPress={this.unlinkEmailPass.bind(this)}>Unlink Email/Pass</Button>
        </CardSection>
      </Card>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderAccountStatus()}
        <Card>
          <CardSection>
            <Button onPress={this.debugCurrentUser.bind(this)}>
              Console User
            </Button>
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
  anonymousAccount: {
    color: '#E14C67',
  },
  perminantAccount: {
    color: '#4BF2A1',
  },
});

export default AccountScreen;

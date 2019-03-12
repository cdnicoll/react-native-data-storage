import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, CardSection } from '../common';

class AccountScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <CardSection>
            <Text>Account Screen</Text>
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

export default AccountScreen;

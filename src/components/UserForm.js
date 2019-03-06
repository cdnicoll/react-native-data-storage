import React from 'react';
import { Input, Card, CardSection, Button } from './common';

class UserForm extends React.Component {
  render() {
    return (
        <Card>
          <CardSection>
            <Input
              label='Name'
              placeholder='Name'
              onChangeText={this.props.onNameChange}
            />
          </CardSection>
          <CardSection>
            <Input
              label='Age'
              placeholder='20'
              onChangeText={this.props.onAgeChange}
            />
          </CardSection>
          <CardSection>
            <Button onPress={this.props.onButtonPress}>Save</Button>
          </CardSection>
        </Card>
    );
  }
}

export default UserForm;

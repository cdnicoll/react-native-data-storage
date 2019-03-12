import React from 'react';
import { View } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import EmployeeScreen from './screens/EmployeeScreen';
import AccountScreen from './screens/AccountScreen';
import { Button } from './common';

const RouterComponent = () => {
  return (
    <View>
      <Router>
        <Scene key='root'>
          {/* using the initial prop will render that page first */}
          <Scene
            key='account'
            component={AccountScreen}
            title='Account'
            tabs={true}
            direction={'vertical'}
            initial
          />
          <Scene
            key='employeeList'
            component={EmployeeScreen}
            tabs={true}
            direction={'vertical'}
            title='Employees'
          />
        </Scene>
      </Router>
      <Button onPress={Actions.employeeList()}>Employee List</Button>
    </View>
  );
};

export default RouterComponent;

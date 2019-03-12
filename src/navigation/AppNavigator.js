import { createBottomTabNavigator } from "react-navigation";

import AccountScreen from "../components/screens/AccountScreen";
import EmployeeScreen from "../components/screens/EmployeeScreen";

export default (AppNavigator = createBottomTabNavigator(
  {
    Account: AccountScreen,
    Employees: EmployeeScreen
  },
  {
    initialRouteName: "Account"
  }
));
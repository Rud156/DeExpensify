import React from 'react';
import { Root } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import DisplayHome from './StackNavigator/DisplayHome';
import AddExpense from './StackNavigator/AddExpense';

const Navigator = createStackNavigator(
  {
    DisplayHome: { screen: DisplayHome },
    AddExpense: { screen: AddExpense },
  },
  {
    initialRouteName: 'DisplayHome',
    headerMode: 'none',
  }
);

class Home extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return (
      <Root>
        <Navigator />
      </Root>
    );
  }
}

export default Home;

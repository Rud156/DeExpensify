import React from 'react';
import { createStackNavigator } from 'react-navigation';

import DisplayHome from './routes/DisplayHome';
import AddExpense from './routes/AddExpense';

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
    return <Navigator />;
  }
}

export default Home;

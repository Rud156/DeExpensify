import React from 'react';
import { Animated, Easing } from 'react-native';
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
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
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

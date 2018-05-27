import * as React from 'react';
import { TabNavigator } from 'react-navigation';
import { Root, Icon } from 'native-base';

import Home from './routes/Home';
import Progress from './routes/Progress';
import Profile from './routes/Profile';

import { COLORS } from './utils/Constants';

const Navigator = TabNavigator(
  {
    Home: { screen: Home },
    Progress: { screen: Progress },
    Profile: { screen: Profile },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Profile') {
          iconName = 'person';
        } else if (routeName === 'Progress') {
          iconName = 'flame';
        } else {
          iconName = 'home';
        }

        return <Icon name={iconName} style={{ color: tintColor }} />;
      },
    }),
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: COLORS.BLUE,
      inactiveTintColor: COLORS.GRAY,
      showIcon: true,
      style: {
        backgroundColor: COLORS.WHITE,
        elevation: 21,
      },
      labelStyle: {
        fontSize: 10,
      },
      tabStyle: {
        padding: 0,
        margin: 0,
        height: 55,
      },
      indicatorStyle: {
        backgroundColor: COLORS.BLUE,
      },
    },
  }
);

const App = () => (
  <Root>
    <Navigator />
  </Root>
);

export default App;

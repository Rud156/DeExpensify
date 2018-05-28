import * as React from 'react';
import { Navigation } from 'react-native-navigation';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';

import { registerScreens } from './screens';
import { COLORS } from './utils/Constants';

registerScreens();

var homeIcon: any;
var progressIcon: any;
var profileIcon: any;

class App {
  constructor() {
    this._populateIcons()
      .then(() => {
        // Start app only if all icons are loaded
        this.startApp();
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  _populateIcons = () => {
    // @ts-ignore
    return new Promise((resolve: Function, reject: Function) => {
      // @ts-ignore
      Promise.all([
        Icon.getImageSource('md-home', 27),
        Icon.getImageSource('md-flame', 27),
        Icon.getImageSource('ios-person', 27),
      ])
        .then((values: any[]) => {
          homeIcon = values[0];
          progressIcon = values[1];
          profileIcon = values[2];
          resolve(true);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        })
        .done();
    });
  };

  startApp() {
    // This will start our app
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Home',
          screen: 'dexpensify.Home',
          icon: homeIcon,
          navigatorStyle: {},
        },
        {
          label: 'Progress',
          screen: 'dexpensify.Progress',
          icon: progressIcon,
          navigatorStyle: {},
        },
        {
          label: 'Profile',
          screen: 'dexpensify.Profile',
          icon: profileIcon,
          navigatorStyle: {},
        },
      ],
      appStyle: {
        // @ts-ignore
        tabBarSelectedButtonColor: COLORS.BLUE,
        tabBarButtonColor: COLORS.GRAY,
        orientation: 'portrait',
        keepStyleAcrossPush: true,
      },
    });
  }
}

export default new App();

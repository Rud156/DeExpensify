import * as React from 'react';
import { Navigation } from 'react-native-navigation';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';

import { registerScreens } from './screens';

registerScreens();

var homeIcon: any;
var homeOutlineIcon: any;
var progressIcon: any;
var progressOutlineIcon: any;
var profileIcon: any;
var profileOutlineIcon: any;

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
        Icon.getImageSource('ios-home', 27),
        Icon.getImageSource('ios-home-outline', 27),
        Icon.getImageSource('ios-flame', 27),
        Icon.getImageSource('ios-flame-outline', 27),
        Icon.getImageSource('ios-person', 27),
        Icon.getImageSource('ios-person-outline', 27),
      ])
        .then((values: any[]) => {
          homeIcon = values[0];
          homeOutlineIcon = values[1];
          progressIcon = values[2];
          progressOutlineIcon = values[3];
          profileIcon = values[4];
          profileOutlineIcon = values[5];
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
          icon: homeOutlineIcon,
          selectedIcon: homeIcon,
          title: 'Home',
          navigatorStyle: {},
        },
        {
          label: 'Progress',
          screen: 'dexpensify.Progress',
          icon: progressOutlineIcon,
          selectedIcon: progressIcon,
          title: 'Progress',
          navigatorStyle: {},
        },
        {
          label: 'Profile',
          screen: 'dexpensify.Profile',
          icon: profileOutlineIcon,
          selectedIcon: profileIcon,
          title: 'Profile',
          navigatorStyle: {},
        },
      ],
    });
  }
}

const app = new App();
export default app;

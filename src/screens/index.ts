import { Navigation } from 'react-native-navigation';

import Home from './../routes/Home';
import Progress from './../routes/Progress';
import Profile from './../routes/Profile';

export function registerScreens() {
  Navigation.registerComponent('dexpensify.Home', () => Home);
  Navigation.registerComponent('dexpensify.Progress', () => Progress);
  Navigation.registerComponent('dexpensify.Profile', () => Profile);
}

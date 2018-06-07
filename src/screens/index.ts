import { Navigation } from 'react-native-navigation';

import Home from './Home';
import Progress from './Progress';
import Profile from './Profile';
import { Store } from 'redux';

export function registerScreens(store: Store, provider: any) {
  Navigation.registerComponent('dexpensify.Home', () => Home, store, provider);
  Navigation.registerComponent('dexpensify.Progress', () => Progress, store, provider);
  Navigation.registerComponent('dexpensify.Profile', () => Profile, store, provider);
}

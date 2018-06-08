import { Navigation } from 'react-native-navigation';

import Home from './Home';
import Stats from './Stats';
import Profile from './Profile';
import { Store } from 'redux';

export function registerScreens(store: Store, provider: any) {
  Navigation.registerComponent('dexpensify.Home', () => Home, store, provider);
  Navigation.registerComponent('dexpensify.Stats', () => Stats, store, provider);
  Navigation.registerComponent('dexpensify.Profile', () => Profile, store, provider);
}

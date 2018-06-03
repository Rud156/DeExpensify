import { Navigation } from 'react-native-navigation';

import Home from './../routes/Home';
import Progress from './../routes/Progress';
import Profile from './../routes/Profile';
import { Store } from 'redux';

export function registerScreens(store: Store, provider: any) {
  Navigation.registerComponent('dexpensify.Home', () => Home, store, provider);
  Navigation.registerComponent('dexpensify.Progress', () => Progress, store, provider);
  Navigation.registerComponent('dexpensify.Profile', () => Profile, store, provider);
}

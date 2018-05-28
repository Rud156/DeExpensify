package com.dexpensify;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
      new VectorIconsPackage()
      ...
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
}

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new VectorIconsPackage()
      ...
    );
  }
}

import React from 'react';
import { Animated, Easing } from 'react-native';
import { NavigationComponentProps, NavigatorEvent } from 'react-native-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Thumbnail, View, Text, Item, Input } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BodyContainer from '../../components/BodyContainer';
import DataList from './DataList';

import {
  setMonthlyAmount,
  setCurrencySymbol,
  setUsername,
  setUserImage,
} from '../../core/actions/profile';

import { convertToCurrency } from '../../utils/ExpenseUtil';
import { getAvatarURL } from '../../utils/StringUtil';
import { COLORS } from '../../utils/ColorUtil';

import { IProfileReducer } from '../../core/reducers/profile';
import { IReducer } from '../../core/reducers';

import style from './style';

interface Props extends NavigationComponentProps {
  profile: IProfileReducer;
  setMonthlyAmount: (amount: number) => any;
  setCurrencySymbol: (symbol: string) => any;
  setUsername: (username: string) => any;
  setUserImage: (userImage: string) => any;
}
interface State {
  imageLoadError: boolean;

  displayMonthlyAmountEditTextField: boolean;
  displayCurrencySymbolEditTextField: boolean;
  displayUsernameEditTextField: boolean;

  monthlyAmount: number;
  currencySymbol: string;
  username: string;

  monthlyAmountError: boolean;
  currencySymbolError: boolean;
  usernameError: boolean;

  animatedValue: Animated.Value;
  animationPerformed: boolean;
}

class Profile extends React.Component<Props, State> {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      imageLoadError: false,
      displayMonthlyAmountEditTextField: false,
      displayCurrencySymbolEditTextField: false,
      displayUsernameEditTextField: false,
      monthlyAmount: props.profile.monthlyAmount,
      currencySymbol: props.profile.currencySymbol,
      username: props.profile.username,
      monthlyAmountError: false,
      currencySymbolError: false,
      usernameError: false,

      animatedValue: new Animated.Value(0),
      animationPerformed: false,
    };

    props.navigator.setOnNavigatorEvent(this.handleRouteAnimations);
  }

  handleRouteAnimations = (event: NavigatorEvent) => {
    switch (event.id) {
      case 'didAppear':
        this.handleRouteEnter();
        break;

      default:
        break;
    }
  };

  handleRouteEnter = () => {
    const { animatedValue, animationPerformed } = this.state;
    if (animationPerformed) {
      return;
    }
    animatedValue.setValue(0);

    setTimeout(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.poly(4)),
      }).start(() => {
        this.setState({ animationPerformed: true });
      });
    }, 200);
  };

  handleEditMonthlyAmount = () => {
    this.setState({ displayMonthlyAmountEditTextField: true });
  };

  handleEditCurrencyAmount = () => {
    this.setState({ displayCurrencySymbolEditTextField: true });
  };

  handleEditUserName = () => {
    this.setState({ displayUsernameEditTextField: true });
  };

  handleMonthlyAmountChange = (amount: string) => {
    this.setState({ monthlyAmount: convertToCurrency(amount), monthlyAmountError: false });
  };

  handleCurrencySymbolChange = (currencySymbol: string) => {
    this.setState({ currencySymbol, currencySymbolError: false });
  };

  handleUsernameChange = (username: string) => {
    this.setState({ username, usernameError: false });
  };

  handleMonthlyAmountSave = () => {
    const { monthlyAmount } = this.state;

    if (!monthlyAmount) {
      this.setState({ monthlyAmountError: true });
      return;
    }

    this.props.setMonthlyAmount(monthlyAmount);
    this.setState({
      displayMonthlyAmountEditTextField: false,
      monthlyAmountError: false,
      monthlyAmount,
    });
  };

  handleCurrencySymbolSave = () => {
    const { currencySymbol } = this.state;

    if (!currencySymbol) {
      this.setState({ currencySymbolError: true });
      return;
    }

    this.props.setCurrencySymbol(currencySymbol);
    this.setState({
      displayCurrencySymbolEditTextField: false,
      currencySymbolError: false,
      currencySymbol,
    });
  };

  handleUsernameSave = () => {
    const { username } = this.state;

    if (!username) {
      this.setState({ usernameError: true });
      return;
    }

    this.props.setUsername(username);
    this.props.setUserImage(username);
    this.setState({
      displayUsernameEditTextField: false,
      usernameError: false,
      username,
    });
  };

  render() {
    const {
      imageLoadError,
      username,
      monthlyAmountError,
      currencySymbolError,
      usernameError,
      displayMonthlyAmountEditTextField,
      displayCurrencySymbolEditTextField,
      displayUsernameEditTextField,
      animatedValue,
    } = this.state;
    const { profile } = this.props;

    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const top = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [21, 0],
    });

    return (
      <BodyContainer title="Profile">
        <View style={style.containerView}>
          <Animated.View style={[style.userImageHolder, { top, opacity }]}>
            {!imageLoadError ? (
              <Thumbnail
                source={{
                  uri: getAvatarURL(profile.userImage),
                }}
                resizeMode="stretch"
                style={style.userImage}
                onError={() => {
                  this.setState({ imageLoadError: true });
                }}
              />
            ) : (
              <MaterialIcons
                name="person"
                size={150}
                color={COLORS.WHITE}
                style={[style.userImage]}
              />
            )}
          </Animated.View>
          <Animated.View style={[style.usernameHolder, { top, opacity }]}>
            {!displayUsernameEditTextField ? (
              <React.Fragment>
                <Text style={style.username}>{profile.username}</Text>
                <MaterialIcons
                  name="edit"
                  color={COLORS.LIGHT_GRAY}
                  onPress={this.handleEditUserName}
                  style={{ paddingTop: 3 }}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Item
                  style={[style.usernameInputHolder, { borderBottomWidth: usernameError ? 1 : 0 }]}
                  error={usernameError}
                >
                  <Input
                    defaultValue={username}
                    style={style.usernameInput}
                    onChangeText={this.handleUsernameChange}
                    autoFocus
                  />
                </Item>
                <MaterialIcons
                  name="save"
                  color={COLORS.LIGHT_GRAY}
                  onPress={this.handleUsernameSave}
                  style={{ paddingTop: 3 }}
                />
              </React.Fragment>
            )}
          </Animated.View>
        </View>
        <Animated.View style={{ padding: 14, top, opacity }}>
          <DataList
            leftText="Monthly Amount"
            rightText={profile.monthlyAmount}
            onEditPress={this.handleEditMonthlyAmount}
            onValueChange={this.handleMonthlyAmountChange}
            handleValueSave={this.handleMonthlyAmountSave}
            displayTextField={displayMonthlyAmountEditTextField}
            error={monthlyAmountError}
          />
          <DataList
            leftText="Currency Symbol"
            rightText={profile.currencySymbol}
            onEditPress={this.handleEditCurrencyAmount}
            onValueChange={this.handleCurrencySymbolChange}
            handleValueSave={this.handleCurrencySymbolSave}
            displayTextField={displayCurrencySymbolEditTextField}
            error={currencySymbolError}
          />
        </Animated.View>
      </BodyContainer>
    );
  }
}

const mapStateToProps = (state: IReducer) => ({
  profile: state.profile,
});

const matchDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setMonthlyAmount: setMonthlyAmount,
      setCurrencySymbol: setCurrencySymbol,
      setUsername: setUsername,
      setUserImage: setUserImage,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Profile);

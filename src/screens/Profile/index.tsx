import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Thumbnail, View, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import BodyContainer from '../../components/BodyContainer';

import {
  setMonthlyAmount,
  setCurrencySymbol,
  setUsername,
  setUserImage,
} from '../../core/actions/profile';

import { getAvatarURL } from '../../utils/StringUtil';

import { IProfileReducer } from '../../core/reducers/profile';
import { IReducer } from '../../core/reducers';
import DataList from './DataList';
import { COLORS } from '../../utils/ColorUtil';

interface Props {
  profile: IProfileReducer;
  setMonthlyAmount: (amount: number) => any;
  setCurrencySymbol: (symbol: string) => any;
  setUsername: (username: string) => any;
  setUserImage: (userImage: string) => any;
}
interface State {
  imageLoadError: boolean;
}

class Profile extends React.Component<Props, State> {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      imageLoadError: false,
    };
  }

  render() {
    const { imageLoadError } = this.state;
    const { profile } = this.props;

    return (
      <BodyContainer title="Profile">
        <View>
          {!imageLoadError ? (
            <Thumbnail
              source={{
                uri: getAvatarURL(profile.userImage),
              }}
              large
              resizeMode="stretch"
              style={{ marginTop: 21, alignSelf: 'center' }}
              onError={() => {
                this.setState({ imageLoadError: true });
              }}
            />
          ) : (
            <Icon
              name="ios-person"
              size={100}
              color={COLORS.ORANGE}
              style={{ borderRadius: 50, alignSelf: 'center' }}
            />
          )}
        </View>
        <View style={{ marginTop: 14 }}>
          <Text style={{ textAlign: 'center' }}>{profile.username}</Text>
        </View>
        <View style={{ padding: 14 }}>
          <DataList leftText="Monthly Amount" rightText={profile.monthlyAmount} />
          <DataList leftText="Currency Symbol" rightText={profile.currencySymbol} />
        </View>
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

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import BodyContainer from '../../components/BodyContainer';

import {
  setMonthlyAmount,
  setCurrencySymbol,
  setUsername,
  setUserImage,
} from '../../core/actions/profile';

import { IProfileReducer } from '../../core/reducers/profile';
import { IReducer } from '../../core/reducers';

interface Props {
  profile: IProfileReducer;
  setMonthlyAmount: (amount: number) => any;
  setCurrencySymbol: (symbol: string) => any;
  setUsername: (username: string) => any;
  setUserImage: (userImage: string) => any;
}
interface State {}

class Profile extends React.Component<Props, State> {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    return <BodyContainer title="Profile" />;
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

export default connect(mapStateToProps, matchDispatchToProps)(Profile);

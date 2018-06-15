import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { View, Text } from 'native-base';

import BodyContainer from '../../components/BodyContainer';
import LineChartBasic from '../../components/LineChartBasic';

import { removeExpense } from '../../core/actions/expenditure';

import { IReducer } from '../../core/reducers';
import { IExpenditureReducer } from '../../core/reducers/expenditure';
import { IProfileReducer } from '../../core/reducers/profile';

import style from './style';

interface Props {
  expenditure: IExpenditureReducer;
  profile: IProfileReducer;
  removeExpense: (expenseId: string, date: string) => any;
}

interface State {}

class Stats extends React.Component<Props, State> {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    const data = [0, 100, 100, 0, 50];
    const { profile } = this.props;

    return (
      <BodyContainer title="Stats">
        <View style={style.containerView}>
          <View>
            <Text style={style.dateTextStyle}>Hello World</Text>
          </View>
        </View>
      </BodyContainer>
    );
  }
}

const mapStateToProps = (state: IReducer) => ({
  profile: state.profile,
  expenditure: state.expenditure,
});

const matchDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      removeExpense,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Stats);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { View, Text } from 'native-base';
import { LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import { Circle } from 'react-native-svg';
import * as shape from 'd3-shape';

import BodyContainer from '../../components/BodyContainer';

import { removeExpense } from '../../core/actions/expenditure';
import { COLORS } from '../../utils/ColorUtil';

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

    const Decorator = ({
      x,
      y,
      data,
    }: {
      x: (value: number) => any;
      y: (value: number) => any;
      data: number[];
    }) => {
      return data.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={COLORS.BLUE}
          fill={COLORS.WHITE}
        />
      ));
    };

    return (
      <BodyContainer title="Stats">
        <View style={style.containerView}>
          <View>
            <Text style={style.dateTextStyle}>Hello World</Text>
          </View>
          <View style={style.chartHolder}>
            <YAxis
              data={data}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{
                fill: COLORS.WHITE,
                fontSize: 10,
              }}
              numberOfTicks={5}
              formatLabel={value => `${profile.currencySymbol} ${value}`}
              style={{ height: 200 }}
            />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <LineChart
                data={data}
                curve={shape.curveCatmullRom}
                svg={{ stroke: COLORS.BLUE }}
                contentInset={{ top: 20, bottom: 20 }}
                style={{ height: 200 }}
              >
                <Decorator />
              </LineChart>
              <XAxis
                style={{ marginHorizontal: -10 }}
                data={data}
                formatLabel={(value, index) => index}
                contentInset={{ left: 10, right: 10 }}
                svg={{ fontSize: 10, fill: COLORS.WHITE }}
              />
            </View>
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

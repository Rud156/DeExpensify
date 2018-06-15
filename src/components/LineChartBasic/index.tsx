import React from 'react';
import { View } from 'native-base';
import { LineChart, YAxis, XAxis } from 'react-native-svg-charts';
import { Circle } from 'react-native-svg';
import * as shape from 'd3-shape';

import Decorator from '../Decorator';

import { COLORS } from '../../../../utils/ColorUtil';

import { IExpenseObject } from '../../../../core/reducers/expenditure';

import style from './style';

interface Props {
  currencySymbol: string;
  data: IExpenseObject[];
}
interface State {}

class LineChartBasic extends React.PureComponent<Props, State> {
  render() {
    const { data, currencySymbol } = this.props;

    return (
      <View style={style.chartHolder}>
        <YAxis
          data={data}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{
            fill: COLORS.WHITE,
            fontSize: 10,
          }}
          numberOfTicks={5}
          formatLabel={(value: IExpenseObject) => `${currencySymbol} ${value.amount}`}
          style={{ height: 200 }}
        />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <LineChart
            data={data}
            curve={shape.curveCatmullRom}
            svg={{ stroke: COLORS.BLUE }}
            contentInset={{ top: 20, bottom: 20 }}
            style={{ height: 200 }}
            yAccessor={({ item }: { item: IExpenseObject }) => item.amount}
          >
            <Decorator />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10 }}
            data={data}
            formatLabel={(value: IExpenseObject) => value.date}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: COLORS.WHITE }}
          />
        </View>
      </View>
    );
  }
}

export default LineChartBasic;

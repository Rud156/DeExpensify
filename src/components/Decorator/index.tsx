import React from 'react';
import { Circle } from 'react-native-svg';

import { COLORS } from '../../utils/ColorUtil';

import { IExpenseObject } from '../../core/reducers/expenditure';

interface Props {
  x?: (value: number) => any;
  y?: (value: number) => any;
  item?: IExpenseObject[];
}
interface State {}

class Decorator extends React.PureComponent<Props, State> {
  public static defaultProps: Props = {
    x: () => {},
    y: () => {},
    item: [],
  };

  render() {
    const { x, y, item } = this.props;

    // @ts-ignore
    return item.map((value, index) => (
      <Circle
        key={index}
        // @ts-ignore
        cx={x(index)}
        // @ts-ignore
        cy={y(value.amount)}
        r={4}
        stroke={COLORS.BLUE}
        fill={COLORS.WHITE}
      />
    ));
  }
}

export default Decorator;

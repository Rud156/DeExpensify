import React from 'react';
import { View, Text } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { COLORS } from '../../../utils/ColorUtil';

import style from './style';

interface Props {
  leftText: string | number;
  rightText: string | number;
}

interface State {}

class DataList extends React.PureComponent<Props, State> {
  render() {
    const { leftText, rightText } = this.props;

    return (
      <View style={style.containerView}>
        <View>
          <Text style={style.leftTextStyle}>{leftText}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={style.rightTextStyle}>{rightText}</Text>
          <MaterialIcons name="edit" color={COLORS.BLACK} />
        </View>
      </View>
    );
  }
}

export default DataList;

import React from 'react';
import { Content, Left, Right, View, Text, ListItem } from 'native-base';
import { COLORS } from '../../utils/ColorUtil';

interface Props {
  amount: number;
  time: string;
  currencySymbol: string;
  comments?: string;
}

class ExpenseList extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { amount, time, currencySymbol, comments } = this.props;

    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLORS.GRAY,
          marginHorizontal: 14,
          paddingVertical: 7,
          marginVertical: 7,
        }}
      >
        <View style={{ marginVertical: 3 }}>
          <Text style={{ textAlign: 'left' }}>{comments}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text>
              {currencySymbol} {amount}
            </Text>
          </View>
          <View>
            <Text>{time}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ExpenseList;

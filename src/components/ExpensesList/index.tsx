import React from 'react';
import { View, Text, Icon } from 'native-base';
import { COLORS } from '../../utils/ColorUtil';

interface Props {
  amount: number;
  time: string;
  currencySymbol: string;
  comments?: string;

  deleteExpense: () => void;
}

class ExpenseList extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { amount, time, currencySymbol, comments, deleteExpense } = this.props;

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
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <View style={{ marginVertical: 3 }}>
              <Text style={{ textAlign: 'left', fontWeight: '500' }}>{comments}</Text>
            </View>
            <View
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
            >
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
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginLeft: 21,
            }}
          >
            <Icon name="md-trash" onPress={deleteExpense} style={{ fontSize: 20 }} />
          </View>
        </View>
      </View>
    );
  }
}

export default ExpenseList;

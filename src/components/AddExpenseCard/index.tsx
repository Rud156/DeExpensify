import React from 'react';
import {
  Body,
  Text,
  Item,
  Form,
  Content,
  CardItem,
  Card,
  Input,
  Label,
  Button,
  Left,
  View,
  Icon,
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { COLORS } from '../../utils/ColorUtil';

interface Props {
  isDateTimePickerVisible: boolean;

  onConfirmDate: (date: Date) => void;
  openPicker: () => void;
  closePicker: () => void;
  handleAmountChange: (amount: string) => void;
  amountTouched: () => void;
  handleCommentsChange: (comment: string) => void;
  deletePressed: () => void;

  amountError?: boolean;
  dateError?: boolean;

  selectedDateTime: string;
  index: number;
}

class AddExpenseCard extends React.PureComponent<Props, {}> {
  render() {
    const {
      isDateTimePickerVisible,
      onConfirmDate,
      openPicker,
      closePicker,
      handleAmountChange,
      amountTouched,
      handleCommentsChange,
      deletePressed,
      amountError,
      dateError,
      selectedDateTime,
      index,
    } = this.props;

    return (
      <View style={{ marginVertical: 3, marginHorizontal: 7 }}>
        <Card>
          <CardItem>
            <Content>
              <View
                style={{
                  display: 'flex',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}
              >
                <Text style={{ fontSize: 18 }}>Expense {index}</Text>
                <Icon name="md-trash" onPress={deletePressed} />
              </View>
              <Form>
                <Item stackedLabel error={amountError}>
                  <Label>How much did you spend?</Label>
                  <Input
                    keyboardType="numeric"
                    onTouchStart={amountTouched}
                    onChangeText={handleAmountChange}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>Anything you wish to say?</Label>
                  <Input keyboardType="default" onChangeText={handleCommentsChange} />
                </Item>
                <Item style={{ marginTop: 21 }} error={dateError} last>
                  <DateTimePicker
                    mode="datetime"
                    isVisible={isDateTimePickerVisible}
                    onConfirm={onConfirmDate}
                    onCancel={closePicker}
                  />
                  <Left>
                    <Button
                      onPress={openPicker}
                      style={{ backgroundColor: COLORS.LIGHT_GRAY, marginRight: 3 }}
                    >
                      <Text style={{ fontSize: 12, textAlign: 'center', color: COLORS.BLACK }}>
                        When did you spend?
                      </Text>
                    </Button>
                  </Left>
                  <Body>
                    <Text>{selectedDateTime}</Text>
                  </Body>
                </Item>
              </Form>
            </Content>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default AddExpenseCard;

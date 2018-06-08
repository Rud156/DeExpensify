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
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { COLORS } from '../../utils/ColorUtil';

interface Props {
  isDateTimePickerVisible: boolean;
  onConfirmDate: (date: Date) => void;
  openPicker: () => void;
  closePicker: () => void;
  handleAmountChange: (amount: string) => void;
  handleCommentsChange: (comment: string) => void;
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
      handleCommentsChange,
      selectedDateTime,
      index
    } = this.props;

    return (
      <View style={{ marginVertical: 3, marginHorizontal: 7 }}>
        <Card>
          <CardItem>
            <Content>
              <Text>Expense {index}</Text>
              <Form>
                <Item floatingLabel>
                  <Label>How much did you spend?</Label>
                  <Input keyboardType="numeric" onChangeText={handleAmountChange} />
                </Item>
                <Item floatingLabel>
                  <Label>Anything you wish to say?</Label>
                  <Input keyboardType="default" onChangeText={handleCommentsChange} />
                </Item>
                <Item style={{ marginTop: 21 }}>
                  <DateTimePicker
                    mode="datetime"
                    isVisible={isDateTimePickerVisible}
                    onConfirm={onConfirmDate}
                    onCancel={closePicker}
                  />
                  <Left>
                    <Button
                      onPress={openPicker}
                      style={{ backgroundColor: COLORS.BLUE, marginRight: 3 }}
                    >
                      <Text style={{ fontSize: 14, textAlign: 'center' }}>
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

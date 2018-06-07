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
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

interface Props {
  isDateTimePickerVisible: boolean;
  onConfirmDate: (date: Date) => void;
  openPicker: () => void;
  closePicker: () => void;
  handleAmountChange: (amount: string) => void;
  handleCommentsChange: (comment: string) => void;
  selectedDateTime: string;
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
    } = this.props;

    return (
      <Card>
        <CardItem>
          <Content>
            <Text>Expense</Text>
            <Form>
              <Item floatingLabel>
                <Label>How much did you spend?</Label>
                <Input keyboardType="numeric" onChangeText={handleAmountChange} />
              </Item>
              <Item floatingLabel>
                <Label>Anything to declare?</Label>
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
                  <Button onPress={openPicker}>
                    <Text>Select Date and Time</Text>
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
    );
  }
}

export default AddExpenseCard;

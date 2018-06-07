import React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Button, Icon, List, Fab } from 'native-base';
import moment from 'moment';

import BodyContainer from '../../../../components/BodyContainer';
import AddExpenseCard from '../../../../components/AddExpenseCard';
import FloatingButton from '../../../../components/FloatingButton';

import { convertToCurrency } from '../../../../utils/ExpenseUtil';
import {
  generateISODateString,
  generateFormattedTime,
  formatHumanReadableDate,
} from '../../../../utils/DateUtil';
import { COLORS } from '../../../../utils/ColorUtil';

interface IExpenseDisplayObject {
  isDatePickerVisible: boolean;
  amount: number;
  comments: string;
  date: string;
  time: string;
}

interface Props extends NavigationInjectedProps {}
interface State {
  expenses: IExpenseDisplayObject[];
}

class AddExpense extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      expenses: [],
    };
  }

  componentDidMount() {
    const expenseObject: IExpenseDisplayObject = {
      isDatePickerVisible: false,
      amount: 0,
      comments: '',
      date: '',
      time: '',
    };
    this.setState({ expenses: [expenseObject] });
  }

  openDateTimePickerModal = (index: number) => {
    const { expenses } = this.state;
    expenses[index].isDatePickerVisible = true;

    this.setState({ expenses });
  };

  closeDateTimePickerModal = (index: number) => {
    const { expenses } = this.state;
    expenses[index].isDatePickerVisible = false;

    this.setState({ expenses });
  };

  handleAmountChange = (amount: string, index: number) => {
    const { expenses } = this.state;
    expenses[index].amount = convertToCurrency(amount);

    this.setState({ expenses });
  };

  handleCommentsChange = (comments: string, index: number) => {
    const { expenses } = this.state;
    expenses[index].comments = comments;

    this.setState({ expenses });
  };

  handleDateChange = (date: Date, index: number) => {
    const { expenses } = this.state;
    const parsedDate = moment(date);
    const hour = parsedDate.hour();
    const minute = parsedDate.minute();
    expenses[index].date = generateISODateString(date);
    expenses[index].time = generateFormattedTime(hour, minute);

    this.setState({ expenses });
  };

  render() {
    const { expenses } = this.state;

    return (
      <BodyContainer
        title="Add Expense"
        leftComponent={
          <Button
            transparent
            onPress={() => {
              this.props.navigation.navigate('DisplayHome');
            }}
          >
            <Icon name="arrow-round-back" />
          </Button>
        }
        fixedPositionButtons={
          <React.Fragment>
            <FloatingButton
              onPress={() => {
                console.log('Button Pressed');
              }}
              buttonText="Save"
            />
            <FloatingButton
              onPress={() => {
                console.log('Button Pressed');
              }}
              buttonText="Add Another"
              buttonPositionRight={100}
              buttonColor={COLORS.ORANGE}
            />
          </React.Fragment>
        }
      >
        <List>
          {expenses.map((expense, index) => (
            <AddExpenseCard
              key={`${index}`}
              closePicker={() => {
                this.closeDateTimePickerModal(index);
              }}
              onConfirmDate={date => {
                this.handleDateChange(date, index);
              }}
              openPicker={() => {
                this.openDateTimePickerModal(index);
              }}
              handleAmountChange={amount => {
                this.handleAmountChange(amount, index);
              }}
              handleCommentsChange={comments => {
                this.handleCommentsChange(comments, index);
              }}
              isDateTimePickerVisible={expense.isDatePickerVisible}
              selectedDateTime={
                expense.date ? `${formatHumanReadableDate(expense.date)}, ${expense.time}` : ''
              }
            />
          ))}
        </List>
      </BodyContainer>
    );
  }
}

export default AddExpense;

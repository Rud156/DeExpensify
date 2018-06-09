import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { NavigationInjectedProps } from 'react-navigation';
import { Button, Icon, Toast, List, View } from 'native-base';
import moment from 'moment';

import BodyContainer from '../../../../components/BodyContainer';
import AddExpenseCard from '../../../../components/AddExpenseCard';
import BottomButton from '../../../../components/BottomButton';

import { addExpense } from '../../../../core/actions/expenditure';

import { convertToCurrency } from '../../../../utils/ExpenseUtil';
import {
  generateISODateString,
  generateFormattedTime,
  formatHumanReadableDate,
} from '../../../../utils/DateUtil';
import { COLORS } from '../../../../utils/ColorUtil';

import style from './style';

interface IExpenseDisplayObject {
  isDatePickerVisible: boolean;
  amount: number;
  amountValid: boolean;
  amountTouched: boolean;
  comments: string;
  date: string;
  time: string;
  dateTimeValid: boolean;
  dateTimeTouched: boolean;
  formattedDate: string;
}

interface Props extends NavigationInjectedProps {
  addExpense: (amount: number, date: string, time: string, comments: string) => any;
}
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

  createInitialSingleExpense = (callback?: () => void) => {
    const expenseObject: IExpenseDisplayObject = {
      isDatePickerVisible: false,
      amount: 0,
      amountValid: false,
      amountTouched: false,
      comments: '',
      date: '',
      time: '',
      dateTimeValid: false,
      dateTimeTouched: false,
      formattedDate: '',
    };
    this.setState({ expenses: [expenseObject] }, () => {
      if (callback) {
        callback();
      }
    });
  };

  componentDidMount() {
    this.createInitialSingleExpense();
  }

  openDateTimePickerModal = (index: number) => {
    const { expenses } = this.state;
    expenses[index].isDatePickerVisible = true;
    expenses[index].dateTimeTouched = true;

    this.setState({ expenses });
  };

  closeDateTimePickerModal = (index: number) => {
    const { expenses } = this.state;
    expenses[index].isDatePickerVisible = false;

    this.setState({ expenses });
  };

  handleAmountTouch = (index: number) => {
    const { expenses } = this.state;
    expenses[index].amountTouched = true;

    this.setState({ expenses });
  };

  handleAmountChange = (amount: string, index: number) => {
    const { expenses } = this.state;
    expenses[index].amount = convertToCurrency(amount);
    expenses[index].amountValid = true;

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
    expenses[index].formattedDate = formatHumanReadableDate(date);
    expenses[index].dateTimeValid = true;

    this.setState({ expenses });
  };

  addAnotherExpense = () => {
    const { expenses } = this.state;
    const expenseObject: IExpenseDisplayObject = {
      isDatePickerVisible: false,
      amount: 0,
      amountValid: false,
      amountTouched: false,
      comments: '',
      date: '',
      time: '',
      dateTimeValid: false,
      dateTimeTouched: false,
      formattedDate: '',
    };

    expenses.push(expenseObject);
    this.setState({ expenses });
  };

  deleteExpense = (index: number) => {
    const { expenses } = this.state;
    if (expenses.length === 1) {
      return;
    }

    expenses.splice(index, 1);
    this.setState({ expenses });
  };

  validateExpenses = (): boolean => {
    const { expenses } = this.state;
    let allValid = true;

    const updatedExpenses = expenses.map(expense => {
      if (!expense.amount) {
        expense.amountValid = false;
        allValid = false;
      }

      if (!expense.dateTimeValid) {
        expense.dateTimeValid = false;
        allValid = false;
      }

      expense.amountTouched = true;
      expense.dateTimeTouched = true;

      return expense;
    });

    if (!allValid) {
      this.setState({ expenses: updatedExpenses });
    }

    return allValid;
  };

  saveExpenses = () => {
    const valid = this.validateExpenses();
    if (!valid) {
      return;
    }

    const { expenses } = this.state;
    expenses.forEach(expense => {
      this.props.addExpense(expense.amount, expense.date, expense.time, expense.comments);
    });
    this.createInitialSingleExpense(() => {
      Toast.show({
        text: 'WoHoo! All Expenses Saved!',
        position: 'bottom',
        type: 'success',
        duration: 1000,
      });

      this.props.navigation.navigate('DisplayHome');
    });
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
          <View style={style.bottomView}>
            <BottomButton
              onPress={this.addAnotherExpense}
              buttonText="Add Another"
              buttonColor={COLORS.ORANGE}
            />
            <BottomButton onPress={this.saveExpenses} buttonText="Save" />
          </View>
        }
      >
        <List style={{ marginBottom: 40 }}>
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
              amountTouched={() => {
                this.handleAmountTouch(index);
              }}
              handleAmountChange={amount => {
                this.handleAmountChange(amount, index);
              }}
              handleCommentsChange={comments => {
                this.handleCommentsChange(comments, index);
              }}
              deletePressed={() => {
                this.deleteExpense(index);
              }}
              index={index + 1}
              isDateTimePickerVisible={expense.isDatePickerVisible}
              selectedDateTime={expense.date ? `${expense.formattedDate}, ${expense.time}` : ''}
              amountError={!expense.amountValid && expense.amountTouched}
              dateError={!expense.dateTimeValid && expense.dateTimeTouched}
            />
          ))}
        </List>
      </BodyContainer>
    );
  }
}

const matchDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addExpense: addExpense,
    },
    dispatch
  );

export default connect(
  null,
  matchDispatchToProps
)(AddExpense);

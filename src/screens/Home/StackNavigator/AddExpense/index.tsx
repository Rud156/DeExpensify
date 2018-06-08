import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { NavigationInjectedProps } from 'react-navigation';
import { Button, Icon, Toast } from 'native-base';
import moment from 'moment';

import BodyContainer from '../../../../components/BodyContainer';
import AddExpenseCard from '../../../../components/AddExpenseCard';
import FloatingButton from '../../../../components/FloatingButton';

import { addExpense } from '../../../../core/actions/expenditure';

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

  componentDidMount() {
    const expenseObject: IExpenseDisplayObject = {
      isDatePickerVisible: false,
      amount: 0,
      comments: '',
      date: '',
      time: '',
      formattedDate: '',
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
    expenses[index].formattedDate = formatHumanReadableDate(date);

    this.setState({ expenses });
  };

  addAnotherExpense = () => {
    const { expenses } = this.state;
    const expenseObject: IExpenseDisplayObject = {
      isDatePickerVisible: false,
      amount: 0,
      comments: '',
      date: '',
      time: '',
      formattedDate: '',
    };

    expenses.push(expenseObject);
    this.setState({ expenses });
  };

  saveExpenses = () => {
    const { expenses } = this.state;
    expenses.forEach(expense => {
      this.props.addExpense(expense.amount, expense.date, expense.time, expense.comments);
    });
    this.setState(
      {
        expenses: [],
      },
      () => {
        Toast.show({
          text: 'WoHoo! All Expenses Saved!',
          position: 'bottom',
          type: 'success',
          duration: 3000,
          onClose: () => {
            this.props.navigation.navigate('DisplayHome');
          },
        });
      }
    );
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
            <FloatingButton onPress={this.saveExpenses} buttonText="Save" />
            <FloatingButton
              onPress={this.addAnotherExpense}
              buttonText="Add Another"
              buttonPositionRight={100}
              buttonColor={COLORS.ORANGE}
            />
          </React.Fragment>
        }
      >
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={expenses}
          renderItem={({ item: expense, index }) => (
            <AddExpenseCard
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
              index={index}
              isDateTimePickerVisible={expense.isDatePickerVisible}
              selectedDateTime={expense.date ? `${expense.formattedDate}, ${expense.time}` : ''}
            />
          )}
        />
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

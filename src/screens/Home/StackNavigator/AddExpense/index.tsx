import React from 'react';
import { Animated, Dimensions, Easing, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { NavigationInjectedProps, NavigationEventSubscription } from 'react-navigation';
import { Button, Icon, Toast, List } from 'native-base';
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
  firstAnimatedValue: Animated.Value;
  secondAnimatedValue: Animated.Value;
}

const { height } = Dimensions.get('window');

class AddExpense extends React.Component<Props, State> {
  didFocusSubscription: NavigationEventSubscription;
  willBlurSubscription: NavigationEventSubscription | null;

  constructor(props: Props) {
    super(props);

    this.state = {
      expenses: [],
      firstAnimatedValue: new Animated.Value(0),
      secondAnimatedValue: new Animated.Value(0),
    };

    this.didFocusSubscription = props.navigation.addListener('didFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleRouteExit);
      this.handleRouteEnter();
    });
    this.willBlurSubscription = null;
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener('willBlur', () => {
      BackHandler.removeEventListener('hardwareBackPress', this.handleRouteExit);
    });
  }

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
  }

  handleRouteEnter = () => {
    const { firstAnimatedValue, secondAnimatedValue } = this.state;
    firstAnimatedValue.setValue(0);
    secondAnimatedValue.setValue(0);

    setTimeout(() => {
      Animated.sequence([
        Animated.timing(firstAnimatedValue, {
          toValue: 1,
          duration: 300,
          easing: Easing.inOut(Easing.poly(4)),
        }),
        Animated.timing(secondAnimatedValue, {
          toValue: 1,
          duration: 300,
          easing: Easing.inOut(Easing.poly(4)),
        }),
      ]).start(() => {
        this.createInitialSingleExpense();
      });
    }, 200);
  };

  handleRouteExit = () => {
    this.setState(
      {
        expenses: [],
      },
      () => {
        const { firstAnimatedValue, secondAnimatedValue } = this.state;
        firstAnimatedValue.setValue(1);
        secondAnimatedValue.setValue(1);

        setTimeout(() => {
          Animated.sequence([
            Animated.timing(firstAnimatedValue, {
              toValue: 0,
              duration: 300,
              easing: Easing.inOut(Easing.poly(4)),
            }),
            Animated.timing(secondAnimatedValue, {
              toValue: 0,
              duration: 300,
              easing: Easing.inOut(Easing.poly(4)),
            }),
          ]).start(() => {
            this.props.navigation.navigate('DisplayHome');
            return true;
          });
        }, 200);
      }
    );
  };

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
    expenses[index].isDatePickerVisible = false;

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
      Toast.show({
        text: 'Woah! Looks like you made a mistake',
        position: 'bottom',
        type: 'danger',
        duration: 1000,
      });
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
    const { expenses, firstAnimatedValue, secondAnimatedValue } = this.state;

    const interpolatedHeight = firstAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [280, height],
    });
    const interpolatedBottom = secondAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, 0],
    });

    return (
      <BodyContainer
        title="Add Expense"
        leftComponent={
          <Button transparent onPress={this.handleRouteExit}>
            <Icon name="arrow-round-back" />
          </Button>
        }
        fixedPositionButtons={
          <Animated.View style={[style.bottomView, { bottom: interpolatedBottom }]}>
            <BottomButton
              onPress={this.addAnotherExpense}
              buttonText="Add Another"
              buttonColor={COLORS.LIGHT_GRAY}
              textColor={COLORS.BLACK}
            />
            <BottomButton
              onPress={this.saveExpenses}
              buttonText="Save"
              buttonColor={COLORS.DARK_BLUE}
              textColor={COLORS.WHITE}
            />
          </Animated.View>
        }
      >
        <Animated.View style={{ backgroundColor: COLORS.BLACK, minHeight: interpolatedHeight }}>
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
        </Animated.View>
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

import React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Button, Icon, List } from 'native-base';
import moment from 'moment';

import BodyContainer from '../../../../components/BodyContainer';
import AddExpenseCard from '../../../../components/AddExpenseCard';
import { convertToCurrency } from '../../../../utils/ExpenseUtil';
import { generateISODateString, generateFormattedTime } from '../../../../utils/DateUtil';

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
              this.props.navigation.goBack();
            }}
          >
            <Icon name="arrow-round-back" />
          </Button>
        }
      >
        <List>{/* TODO: Add the list here */}</List>
      </BodyContainer>
    );
  }
}

export default AddExpense;

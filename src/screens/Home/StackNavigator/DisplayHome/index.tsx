import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Dimensions, FlatList, Alert } from 'react-native';
import { View, Text, Icon, Button } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { CircularProgress } from 'react-native-svg-circular-progress';
import moment, { Moment } from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';

import ExpenseList from '../../../../components/ExpensesList';
import BodyContainer from '../../../../components/BodyContainer';

import { getColorForValue, COLORS } from '../../../../utils/ColorUtil';
import {
  generateMonthString,
  generateISODateString,
  formatHumanReadableDate,
} from '../../../../utils/DateUtil';
import {
  convertObjectExpensesToArray,
  getTotalExpenseForDate,
  subtractCurrency,
} from '../../../../utils/ExpenseUtil';
import { removeExpense, updateExpense } from '../../../../core/actions/expenditure';

import { IExpenditureReducer, IExpenseObject } from '../../../../core/reducers/expenditure';
import { IProfileReducer } from '../../../../core/reducers/profile';
import { IReducer } from '../../../../core/reducers';

import style from './style';

interface Props extends NavigationInjectedProps {
  expenditure: IExpenditureReducer;
  profile: IProfileReducer;
  updateExpense: (
    expenseId: string,
    amount: number,
    date: string,
    time: string,
    comments: string
  ) => any;
  removeExpense: (expenseId: string, date: string) => any;
}
interface State {
  today: Moment;

  minProgressColor: string;
  halfProgressColor: string;
  maxProgressColor: string;
}

const { width, height } = Dimensions.get('window');

class DisplayHome extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      today: moment(),

      minProgressColor: COLORS.LIGHT_GREEN,
      halfProgressColor: COLORS.YELLOW,
      maxProgressColor: COLORS.RED,
    };
  }

  goToAddExpense = () => {
    this.props.navigation.navigate('AddExpense');
  };

  handleDeleteExpense = (expense: IExpenseObject) => {
    const { expenseId, date } = expense;
    this.props.removeExpense(expenseId, date);
  };

  deleteExpense = (expense: IExpenseObject) => {
    const { profile } = this.props;

    Alert.alert(
      `Delete expense worth ${profile.currencySymbol}${expense.amount}`,
      `Expense was made on ${formatHumanReadableDate(expense.date)} at ${expense.time}`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Delete Cancelled');
          },
        },
        {
          text: 'OK',
          onPress: () => {
            this.handleDeleteExpense(expense);
          },
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    const { today, minProgressColor, halfProgressColor, maxProgressColor } = this.state;
    const { expenditure, profile } = this.props;

    const todayISOString = generateISODateString(today);
    const monthString = generateMonthString(today);

    const monthExpenses: IExpenseObject[] = convertObjectExpensesToArray(
      expenditure.expenditures[monthString]
    );
    const todayExpenses = monthExpenses.filter(expense => expense.date === todayISOString);

    const monthTotalExpenses: number = getTotalExpenseForDate(monthExpenses);
    const totalAmountLeft = subtractCurrency(profile.monthlyAmount, monthTotalExpenses);
    const percentage = (monthTotalExpenses / profile.monthlyAmount) * 100;

    return (
      <BodyContainer
        title={`Hi, ${profile.username}`}
        rightComponent={
          <Button transparent onPress={this.goToAddExpense}>
            <Icon name="add" style={{ color: COLORS.WHITE }} />
          </Button>
        }
      >
        <View style={{ backgroundColor: COLORS.BLACK, height: 280 }}>
          <View style={style.justifyCenter}>
            <Text style={style.todaysDateText}>{moment(today).format('MMMM, YYYY')}</Text>
          </View>

          <View style={style.justifyCenter}>
            <View style={[style.extraMargin, { alignSelf: 'center' }]}>
              <CircularProgress
                percentage={percentage > 100 ? 100 : percentage}
                blankColor={COLORS.PURE_BLACK}
                donutColor={getColorForValue(
                  monthTotalExpenses,
                  profile.monthlyAmount,
                  minProgressColor,
                  halfProgressColor,
                  maxProgressColor
                )}
                size={150}
                progressWidth={72}
                fillColor={COLORS.BLACK}
              >
                <View>
                  <Text style={{ fontSize: 20, color: COLORS.LIGHT_GRAY, fontWeight: '500' }}>
                    {Math.round(percentage)} %
                  </Text>
                </View>
              </CircularProgress>
            </View>
          </View>

          <View style={style.detailsHolder}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ marginVertical: 3 }}>
                <Text style={style.monthStatsHeader}>EXPENSE</Text>
              </View>
              <View>
                <Text style={[style.monthStatsDetails, { color: COLORS.RED }]}>
                  {profile.currencySymbol} {monthTotalExpenses}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ marginVertical: 3 }}>
                <Text style={style.monthStatsHeader}>BALANCE</Text>
              </View>
              <View>
                <Text style={[style.monthStatsDetails, { color: COLORS.LIGHT_GREEN }]}>
                  {profile.currencySymbol} {totalAmountLeft}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={{ marginVertical: 14, marginLeft: 14 }}>
            <Text style={{ fontSize: 20 }}>Today</Text>
          </View>
          <View>
            {todayExpenses.length !== 0 ? (
              <FlatList
                keyExtractor={item => item.expenseId}
                data={todayExpenses}
                renderItem={({ item: expense, index }) => (
                  <ExpenseList
                    amount={expense.amount}
                    time={expense.time}
                    comments={expense.comments}
                    currencySymbol={profile.currencySymbol}
                    deleteExpense={() => {
                      this.deleteExpense(expense);
                    }}
                  />
                )}
              />
            ) : (
              <View>
                <Entypo
                  name="emoji-flirt"
                  size={50}
                  color={COLORS.DARK_GREY}
                  style={{ textAlign: 'center' }}
                />
                <Text
                  style={{
                    fontSize: 21,
                    color: COLORS.DARK_GREY,
                    textAlign: 'center',
                    marginTop: 14,
                  }}
                >
                  No Expenses Today
                </Text>
              </View>
            )}
          </View>
        </View>
      </BodyContainer>
    );
  }
}

const mapStateToProps = (state: IReducer) => ({
  expenditure: state.expenditure,
  profile: state.profile,
});

const matchDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      updateExpense: updateExpense,
      removeExpense: removeExpense,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(DisplayHome);

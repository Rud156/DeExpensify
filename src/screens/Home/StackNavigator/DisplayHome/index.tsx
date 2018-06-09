import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Dimensions, FlatList } from 'react-native';
import { View, Text, Icon, Fab, Button } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import { CircularProgress } from 'react-native-svg-circular-progress';
import moment, { Moment } from 'moment';

import ExpenseList from '../../../../components/ExpensesList';
import BodyContainer from '../../../../components/BodyContainer';

import { getColorForValue, COLORS } from '../../../../utils/ColorUtil';
import { formatHumanReadableDate, generateISODateString } from '../../../../utils/DateUtil';
import {
  convertObjectExpensesToArray,
  getTotalExpenseForDate,
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

  render() {
    const { today, minProgressColor, halfProgressColor, maxProgressColor } = this.state;
    const { expenditure, profile } = this.props;

    const todayISOString = generateISODateString(today);

    const todaysExpenses: IExpenseObject[] = convertObjectExpensesToArray(
      expenditure.expenditures[todayISOString]
    );
    const todaysTotalExpense: number = getTotalExpenseForDate(todaysExpenses);
    const percentage = (todaysTotalExpense / profile.monthlyAmount) * 100;

    return (
      <BodyContainer
        title={`Welcome, ${profile.username}`}
        rightComponent={
          <Button transparent onPress={this.goToAddExpense}>
            <Icon name="add" style={{ color: COLORS.WHITE }} />
          </Button>
        }
      >
        <View style={style.justifyCenter}>
          <Text style={style.todaysDateText}>{formatHumanReadableDate(today)}</Text>
        </View>
        <View style={style.justifyCenter}>
          <View style={[style.extraMargin, { alignSelf: 'center' }]}>
            <CircularProgress
              percentage={percentage > 100 ? 100 : percentage}
              blankColor={COLORS.GRAY}
              donutColor={getColorForValue(
                todaysTotalExpense,
                profile.monthlyAmount,
                minProgressColor,
                halfProgressColor,
                maxProgressColor
              )}
              size={150}
              progressWidth={72}
            >
              <View>
                <Text style={{ fontSize: 20 }}>{percentage.toFixed(2)} %</Text>
              </View>
            </CircularProgress>
          </View>
        </View>
        <View style={style.justifyCenter}>
          <Text style={style.mainHeaderText}>
            Used {profile.currencySymbol}
            {todaysTotalExpense} out of {profile.currencySymbol}
            {profile.monthlyAmount}
          </Text>
        </View>

        <View>
          <View style={{ marginVertical: 14, marginLeft: 14 }}>
            <Text style={{ fontSize: 20 }}>Today</Text>
          </View>
          <View>
            {todaysExpenses.length !== 0 ? (
              <FlatList
                keyExtractor={item => item.expenseId}
                data={todaysExpenses}
                renderItem={({ item: expense, index }) => (
                  <ExpenseList
                    amount={expense.amount}
                    time={expense.time}
                    comments={expense.comments}
                    currencySymbol={profile.currencySymbol}
                  />
                )}
                onTouchStart={this.handleTouchStart}
                onScrollEndDrag={this.handleTouchEnd}
              />
            ) : (
              <View>
                <Icon
                  name="ios-sunny-outline"
                  style={{ fontSize: 50, color: COLORS.DARK_GREY, textAlign: 'center' }}
                />
                <Text
                  style={{
                    fontSize: 21,
                    color: COLORS.DARK_GREY,
                    textAlign: 'center',
                    marginTop: 14,
                  }}
                >
                  No Spendings
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

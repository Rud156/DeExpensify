import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { StyleSheet, Dimensions } from 'react-native';
import { View, Text, Button, Icon, Fab, List } from 'native-base';
import { NavigationInjectedProps } from 'react-navigation';
import * as Progress from 'react-native-progress';
import moment, { Moment } from 'moment';

import ExpenseList from '../../../../components/ExpensesList';
import BodyContainer from '../../../../components/BodyContainer';

import { getColorForValue, COLORS } from '../../../../utils/ColorUtil';
import { formatHumanReadableDate, generateISODateString } from '../../../../utils/DateUtil';
import {
  convertObjectExpensesToArray,
  getTotalExpenseForDate,
} from '../../../../utils/ExpenseUtil';
import { addExpense, removeExpense, updateExpense } from '../../../../core/actions/expenditure';

import { IExpenditureReducer, IExpenseObject } from '../../../../core/reducers/expenditure';
import { IProfileReducer } from '../../../../core/reducers/profile';
import { IReducer } from '../../../../core/reducers';

import style from './style';

interface Props extends NavigationInjectedProps {
  expenditure: IExpenditureReducer;
  profile: IProfileReducer;
  addExpense: (amount: number, date: string, time: string, comments: string) => any;
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
      // @ts-ignore
      expenditure[todayISOString]
    );
    const todaysTotalExpense: number = getTotalExpenseForDate(todaysExpenses);

    return (
      <BodyContainer
        title={`Welcome, ${profile.username}`}
        fixedPositionButtons={
          <Fab
            onPress={this.goToAddExpense}
            style={style.bottomActionButton}
            position="bottomRight"
          >
            <Icon name="add" style={{ color: COLORS.WHITE }} />
          </Fab>
        }
      >
        <View style={style.justifyCenter}>
          <Text style={style.todaysDateText}>{formatHumanReadableDate(today)}</Text>
        </View>
        <View style={style.justifyCenter}>
          <Progress.Circle
            style={[style.extraMargin, { alignSelf: 'center' }]}
            showsText
            size={150}
            progress={todaysTotalExpense / profile.monthlyAmount}
            thickness={7}
            color={getColorForValue(
              todaysTotalExpense,
              profile.monthlyAmount,
              minProgressColor,
              halfProgressColor,
              maxProgressColor
            )}
          />
        </View>
        <View style={style.justifyCenter}>
          <Text style={style.mainHeaderText}>
            Used {todaysTotalExpense} out of {profile.monthlyAmount}
          </Text>
        </View>

        <View>
          <View style={{ marginVertical: 14, marginLeft: 14 }}>
            <Text style={{ fontSize: 20 }}>Today</Text>
          </View>
          <View>
            <List>
              {todaysExpenses.map(expense => (
                <ExpenseList
                  amount={expense.amount}
                  time={expense.time}
                  comments={expense.comments}
                  currencySymbol={profile.currencySymbol}
                />
              ))}
            </List>
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
      addExpense: addExpense,
      updateExpense: updateExpense,
      removeExpense: removeExpense,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(DisplayHome);

import uuidV4 from 'uuid/v4';
import { ADD_EXPENSE, UPDATE_EXPENSE, REMOVE_EXPENSE } from '../actions/expenditure';
import { generateMonthString } from '../../utils/DateUtil';

export interface IExpenseObject {
  expenseId: string;
  amount: number;
  date: string;
  comments: string;
  time: string;
}

export interface IExpenditureReducer {
  expenditures: {
    [x: string]: {
      [y: string]: IExpenseObject;
    };
  };
}

const initialState: IExpenditureReducer = {
  expenditures: {},
};

export const expenditureReducer = (state = initialState, action: any): IExpenditureReducer => {
  console.log(action.type);

  const { expenditures } = state;
  switch (action.type) {
    case ADD_EXPENSE: {
      const {
        amount,
        date,
        time,
        comments,
      }: { amount: number; date: string; time: string; comments: string } = action.payload;

      const expenseId = uuidV4();
      const monthString = generateMonthString(date);

      if (monthString in expenditures) {
        const currentDateExpenditures = expenditures[monthString];
        currentDateExpenditures[expenseId] = {
          amount,
          comments,
          date,
          time,
          expenseId,
        };

        expenditures[monthString] = currentDateExpenditures;
      } else {
        expenditures[monthString] = {
          [expenseId]: {
            amount,
            comments,
            date,
            time,
            expenseId,
          },
        };
      }

      return { expenditures };
    }

    case UPDATE_EXPENSE: {
      const {
        amount,
        date,
        time,
        comments,
        expenseId,
      }: {
        amount: number;
        date: string;
        time: string;
        comments: string;
        expenseId: string;
      } = action.payload;
      const monthString = generateMonthString(date);

      if (monthString in expenditures) {
        const currentDateExpenditures = expenditures[monthString];
        currentDateExpenditures[expenseId] = {
          amount,
          date,
          time,
          comments,
          expenseId,
        };

        expenditures[monthString] = currentDateExpenditures;
      }

      return { expenditures };
    }

    case REMOVE_EXPENSE: {
      const { expenseId, date }: { expenseId: string; date: string } = action.payload;
      const monthString = generateMonthString(date);

      if (monthString in expenditures) {
        const currentDateExpenditures = expenditures[monthString];
        if (expenseId in currentDateExpenditures) {
          delete currentDateExpenditures[expenseId];
        }

        expenditures[monthString] = currentDateExpenditures;
      }

      return { expenditures };
    }

    default:
      return state;
  }
};

import uuidV4 from 'uuid/v4';
import { ADD_EXPENSE, UPDATE_EXPENSE, REMOVE_EXPENSE } from '../actions/expenditure';

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

      if (date in expenditures) {
        const currentDateExpenditures = expenditures[date];
        currentDateExpenditures[expenseId] = {
          amount,
          comments,
          date,
          time,
          expenseId,
        };

        expenditures[date] = currentDateExpenditures;
      } else {
        expenditures[date] = {
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
      if (date in expenditures) {
        const currentDateExpenditures = expenditures[date];
        currentDateExpenditures[expenseId] = {
          amount,
          date,
          time,
          comments,
          expenseId,
        };

        expenditures[date] = currentDateExpenditures;
      }

      return { expenditures };
    }

    case REMOVE_EXPENSE: {
      const { expenseId, date }: { expenseId: string; date: string } = action.payload;
      if (date in expenditures) {
        const currentDateExpenditures = expenditures[date];
        if (expenseId in currentDateExpenditures) {
          delete currentDateExpenditures[expenseId];
        }

        expenditures[date] = currentDateExpenditures;
      }

      return { expenditures };
    }

    default:
      return state;
  }
};

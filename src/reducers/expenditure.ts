import uuidV4 from 'uuid/v4';
import { ADD_EXPENSE, UPDATE_EXPENSE, REMOVE_EXPENSE } from '../actions/expenditure';

export interface IExpenditure {
  expenditures: {
    [x: string]: {
      [y: string]: {
        expenseId: string;
        amount: number;
        date: string;
        comments: string;
      };
    };
  };
}

const initialState: IExpenditure = {
  expenditures: {},
};

export const expenditureReducer = (state = initialState, action: any): IExpenditure => {
  const { expenditures } = state;
  switch (action.type) {
    case ADD_EXPENSE: {
      const {
        amount,
        date,
        comments,
      }: { amount: number; date: string; comments: string } = action.payload;

      const expenseId = uuidV4();

      if (date in expenditures) {
        const currentDateExpenditures = expenditures[date];
        currentDateExpenditures[expenseId] = {
          amount,
          comments,
          date,
          expenseId,
        };

        expenditures[date] = currentDateExpenditures;
      } else {
        expenditures[date] = {
          [expenseId]: {
            amount,
            comments,
            date,
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
        comments,
        expenseId,
      }: { amount: number; date: string; comments: string; expenseId: string } = action.payload;
      if (date in expenditures) {
        const currentDateExpenditures = expenditures[date];
        currentDateExpenditures[expenseId] = {
          amount,
          date,
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

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const addExpense = (amount: number, date: string, time: string, comments: string) => ({
  type: ADD_EXPENSE,
  payload: {
    amount,
    date,
    time,
    comments,
  },
});

export const updateExpense = (
  expenseId: string,
  amount: number,
  date: string,
  time: string,
  comments: string
) => ({
  type: UPDATE_EXPENSE,
  payload: {
    expenseId,
    amount,
    date,
    time,
    comments,
  },
});

export const removeExpense = (expenseId: string, date: string) => ({
  type: REMOVE_EXPENSE,
  payload: {
    expenseId,
    date,
  },
});

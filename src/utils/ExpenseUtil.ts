import { IExpenseObject } from '../core/reducers/expenditure';

export const convertObjectExpensesToArray = (objectToConvert: any): IExpenseObject[] => {
  if (!objectToConvert) {
    return [];
  }

  const keys = Object.keys(objectToConvert);

  const objectArray: any[] = keys.map(key => ({
    ...objectToConvert[key],
  }));

  return objectArray;
};

export const getTotalExpenseForDate = (dateExpenseArray: IExpenseObject[]): number => {
  let totalExpense = 0;
  dateExpenseArray.forEach(expense => {
    totalExpense += expense.amount;
  });

  return totalExpense;
};

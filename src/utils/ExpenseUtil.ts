import currency from 'currency.js';
import { IExpenseObject } from '../core/reducers/expenditure';

const numberRegex = /\B(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;

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
    totalExpense = addCurrency(expense.amount, totalExpense);
  });

  return totalExpense;
};

export const addCurrency = (firstValue: string | number, secondValue: string | number): number => {
  return currency(firstValue).add(secondValue).value;
};

export const subtractCurrency = (
  firstValue: string | number,
  secondValue: string | number
): number => currency(firstValue).subtract(secondValue).value;

export const multiplyCurrency = (
  firstValue: string | number,
  secondValue: string | number
): number => currency(firstValue).multiply(secondValue).value;

export const divideCurrency = (firstValue: string | number, secondValue: string | number): number =>
  currency(firstValue).divide(secondValue).value;

export const formatCurrencyToString = (currencyValue: string | number): string =>
  currency(currencyValue)
    .value.toString()
    .replace(numberRegex, ',');

export const getUnformattedCurrency = (formattedCurrencyValue: string): number => {
  const currencyValue = formattedCurrencyValue.toString().replace(/,/g, '');
  return currency(currencyValue).value;
};

export const convertToCurrency = (currencyValue: string | number): number =>
  currency(currencyValue).value;

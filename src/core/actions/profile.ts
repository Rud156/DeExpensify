export const SET_MONTHLY_AMOUNT = 'SET_MONTHLY_AMOUNT';
export const SET_CURRENCY_SYMBOL = 'SET_CURRENCY_SYMBOL';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_USER_IMAGE = 'SET_USER_IMAGE';

export const setMonthlyAmount = (amount: number) => ({
  type: SET_MONTHLY_AMOUNT,
  payload: {
    amount,
  },
});

export const setCurrencySymbol = (symbol: string) => ({
  type: SET_CURRENCY_SYMBOL,
  payload: {
    symbol,
  },
});

export const setUsername = (username: string) => ({
  type: SET_USERNAME,
  payload: {
    username,
  },
});

export const setUserImage = (userImage: string) => ({
  type: SET_USER_IMAGE,
  payload: {
    userImage,
  },
});

import {
  SET_MONTHLY_AMOUNT,
  SET_CURRENCY_SYMBOL,
  SET_USERNAME,
  SET_USER_IMAGE,
} from '../actions/profile';

export interface IProfileReducer {
  monthlyAmount: number;
  currencySymbol: string;
  userImage: string;
  username: string;
}

const initialState: IProfileReducer = {
  monthlyAmount: 1500,
  currencySymbol: '$',
  userImage: 'Rud156',
  username: 'Rud156',
};

export const profileReducer = (state = initialState, action: any): IProfileReducer => {
  switch (action.type) {
    case SET_MONTHLY_AMOUNT: {
      const { amount }: { amount: number } = action.payload;

      return {
        ...state,
        monthlyAmount: amount,
      };
    }

    case SET_CURRENCY_SYMBOL: {
      const { symbol }: { symbol: string } = action.payload;

      return {
        ...state,
        currencySymbol: symbol,
      };
    }

    case SET_USERNAME: {
      const { username }: { username: string } = action.payload;

      return {
        ...state,
        username,
      };
    }

    case SET_USER_IMAGE: {
      const { userImage }: { userImage: string } = action.payload;

      return {
        ...state,
        userImage,
      };
    }

    default:
      return state;
  }
};

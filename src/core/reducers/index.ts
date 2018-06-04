import { expenditureReducer, IExpenditureReducer } from './expenditure';
import { profileReducer, IProfileReducer } from './profile';

export interface IReducer {
  expenditure: IExpenditureReducer;
  profile: IProfileReducer;
}

export const combinedReducer = {
  expenditure: expenditureReducer,
  profile: profileReducer,
};

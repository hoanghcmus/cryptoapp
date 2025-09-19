import { Currency } from '../../data-types/crypto';
import { IAppState } from '../reducers/app';

export const selectApp = (state: any): IAppState => {
  return state.app;
};

export const selectCurrencyList = (state: any): Array<Currency> => {
   const app = selectApp(state);
   return app.currencies;
};


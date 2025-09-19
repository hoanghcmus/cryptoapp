import { Currency } from '../../data-types/crypto';
import * as appActions from '../actions/app';
import { ActionType, getType } from 'typesafe-actions';

export interface IAppState {
  currencies: Array<Currency>;
}

export const initialState: IAppState = {
  currencies: [],
};

type Action = ActionType<typeof appActions>;

export default function app(state = initialState, action: Action): IAppState {
  switch (action.type) {
    case getType(appActions.setCurrencyList):
      console.log( " setCurrencyList action.payload", action.payload  )
      return { ...state, currencies: action.payload };
    case getType(appActions.clearCurrencyList):
       console.log( "clearCurrencyList")
      return { ...state, currencies: [] };
    default:
      return state;
  }
}

export const toPersist = (state: IAppState) => {
  const { currencies } = state;
  return { currencies };
};

export const fromPersist = (state: IAppState) => {
  const { currencies } = state;
  return {
    ...initialState,
    currencies,
  };
};

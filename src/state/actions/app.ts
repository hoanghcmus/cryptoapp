import { createAction } from 'typesafe-actions';
import { Currency } from '../../data-types/crypto';

export enum AppActionType {
  NONE = '[APP] NONE',
  SET_CURRENCY_LIST = '[APP] SET_CURRENCY_LIST',
  CLEAR_CURRENCY_LIST = '[APP] CLEAR_CURRENCY_LIST',
}

export const setCurrencyList = createAction(
  AppActionType.SET_CURRENCY_LIST,
  (payload: Array<Currency>) => payload,
)();

export const clearCurrencyList = createAction(
  AppActionType.CLEAR_CURRENCY_LIST,
  (payload: void) => payload,
)();

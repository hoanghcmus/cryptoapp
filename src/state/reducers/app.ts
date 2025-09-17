import * as appActions from '../actions/app';
import { ActionType } from 'typesafe-actions';

export interface IAppState {
  data: any[];
}

export const initialState: IAppState = {
  data: [],
};

type Action = ActionType<typeof appActions>;

export default function app(state = initialState, _action: Action): IAppState {
  return state;
}

export const toPersist = (state: IAppState) => {
  const { data } = state;
  return { data };
};

export const fromPersist = (state: IAppState) => {
  const { data } = state;
  return {
    ...initialState,
    data,
  };
};

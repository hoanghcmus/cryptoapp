import { IAppState } from '../reducers/app';

export const selectApp = (state: any): IAppState => {
  return state.app;
};

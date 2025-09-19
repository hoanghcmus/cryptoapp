import { useSelector } from 'react-redux';
import { selectApp, selectCurrencyList } from '../selectors/app';

export const useApp = () => {
  return useSelector(selectApp);
};

export const useCurrencyList = () => {
  return useSelector(selectCurrencyList);
};

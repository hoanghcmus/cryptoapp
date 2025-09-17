import { useSelector } from 'react-redux';
import { selectApp } from '../selectors/app';

export const useApp = () => {
  return useSelector(selectApp);
};

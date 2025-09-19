// apis.ts
import axios from 'axios';
import { DataSet } from '../configs/sample-data';
import log from '../utils/log';
import { fetchAllCurrencies as fetchAllCurrenciesNative } from '../native/CurrenciesModule';
import { Currency } from '../data-types/crypto';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL: 'https://api.crypto.com/v1',
  timeout: 10000,
});

export default api;

/**
 * Main entrypoint to fetch currencies by type
 * - All API call always not invoked on Main Thread (UI Thread)
 */
export const fetchCurrencies = async (
  type: 'crypto' | 'fiat' | 'all',
): Promise<Currency[]> => {
  log.d(type, 'Fetching currencies of type:');
  switch (type) {
    case 'fiat':
      return fetchFiatCurrencies();
    case 'crypto':
      return fetchCryptoCurrencies();
    default:
      return fetchAllCurrencies();
  }
};

/**
 * Mock crypto dataset
 */
export const fetchCryptoCurrencies = async (): Promise<Currency[]> => {
  return Promise.resolve(DataSet.cryptoCurrencies);
};

/**
 * Mock fiat dataset
 */
export const fetchFiatCurrencies = async (): Promise<Currency[]> => {
  return Promise.resolve(DataSet.fiatCurrencies);
};

/**
 * Combined dataset
 * - iOS → always mock
 * - Android → call native TurboModule (background thread)
 */
export const fetchAllCurrencies = async (): Promise<Currency[]> => {
  if (Platform.OS === 'android') {
    return fetchAllCurrenciesNative();
  }
  return Promise.resolve([...DataSet.cryptoCurrencies, ...DataSet.fiatCurrencies]);
};

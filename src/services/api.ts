import axios from 'axios';
import { DataSet } from '../configs/sample-data';

const api = axios.create({
  baseURL: 'https://api.crypto.com/v1', // Example API for crypto data
  timeout: 10000,
});

export default api;

export const fetchCurrencies = async (type: 'crypto' | 'fiat' | 'all') => {
  switch (type) {
    case 'fiat':
      return fetchFiatCurrencies();
    case 'crypto':
    default:
      return fetchCryptoCurrencies();
  }
};

export const fetchCryptoCurrencies = async () => {
  // Mocking API response with sample cryptoCurrencies dataset
  return Promise.resolve(DataSet.cryptoCurrencies);
};

export const fetchFiatCurrencies = async () => {
  // Mocking API response with sample fiatCurrencies dataset
  return Promise.resolve(DataSet.fiatCurrencies);
};

export const fetchAllCurrencies = async () => {
  // Mocking API response with sample dataset
  return Promise.resolve([
    ...DataSet.cryptoCurrencies,
    ...DataSet.fiatCurrencies,
  ]);
};

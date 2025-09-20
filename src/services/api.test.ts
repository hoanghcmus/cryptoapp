import { fetchCurrencies, fetchAllCurrencies } from './api';
import { DataSet } from '../configs/sample-data';

describe('API functions', () => {

  beforeEach(() => {
    // Reset mocks before each test to prevent side effects
    jest.clearAllMocks();
  });

  describe('fetchCurrencies', () => {
    it('returns crypto currencies when type is "crypto"', async () => {
      const data = await fetchCurrencies('crypto');
      expect(data).toEqual(DataSet.cryptoCurrencies);
    });

    it('returns fiat currencies when type is "fiat"', async () => {
      const data = await fetchCurrencies('fiat');
      expect(data).toEqual(DataSet.fiatCurrencies);
    });

    it('returns all currencies when type is "all"', async () => {
      const data = await fetchCurrencies('all');
      expect(data).toEqual([...DataSet.cryptoCurrencies, ...DataSet.fiatCurrencies]);
    });
  });

  describe('fetchAllCurrencies', () => {
    it('returns combined data on iOS', async () => {
      // Mock Platform to be iOS
      jest.mock('react-native/Libraries/Utilities/Platform', () => ({
        OS: 'ios',
      }));


      const data = await fetchAllCurrencies();
      expect(data).toEqual([...DataSet.cryptoCurrencies, ...DataSet.fiatCurrencies]);
    });

    it('calls native module on Android', async () => {

      // Mock Platform to be Android
      jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
        OS: 'android',
      }));

      // Mock native data
      const mockNativeData = [{ id: 'BTC', name: 'Bitcoin', symbol: 'BTC' }];
      jest.doMock('../native/CurrenciesModule', () => ({
        fetchAllCurrencies: jest.fn().mockResolvedValue(mockNativeData),
      }));

      const data = await fetchAllCurrencies();
      expect(data[0]).toEqual(mockNativeData[0]);
    });

  });

});
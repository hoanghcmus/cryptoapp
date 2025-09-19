import { Platform } from 'react-native';
import Spec from './NativeModuleSpec';
import { Currency } from '../../data-types/crypto';
import { DataSet } from '../../configs/sample-data';
import log from '../../utils/log';

export async function fetchAllCurrencies(): Promise<Currency[]> {
  if (Platform.OS === 'android') {
    try {
      const currencies = await Spec.fetchAllCurrencies();
      log.i(currencies, '[CurrenciesModule] Native call success:');
      return currencies;
    } catch (e) {
      log.e(e, '[CurrenciesModule] Native call failed:');
      return [...DataSet.cryptoCurrencies, ...DataSet.fiatCurrencies];
    }
  }
  // iOS → fallback mock
  return [...DataSet.cryptoCurrencies, ...DataSet.fiatCurrencies];
}

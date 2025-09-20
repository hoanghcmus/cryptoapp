/* eslint-disable no-undef */

jest.mock('./src/native/CurrenciesModule', () => ({
    fetchAllCurrencies: jest.fn(),
}));

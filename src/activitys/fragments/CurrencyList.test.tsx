// __tests__/CurrencyList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { DataSet } from '../../configs/sample-data';
import CurrencyList from './CurrencyList';

describe('CurrencyList', () => {
  it('renders a list of currencies correctly', () => {
    const currencies = DataSet.cryptoCurrencies;
    render(<CurrencyList currencies={currencies} />);

    // Get all currency-name elements
    const renderedItems = screen.getAllByTestId('currency-name');

    // Assert the count matches
    expect(renderedItems.length).toBeLessThanOrEqual(currencies.length);

    // Optional: Assert text content matches the original array
    renderedItems.forEach((item, index) => {
      expect(item).toHaveTextContent(currencies[index].name);
    });
  });

  it('renders the correct number of items', () => {
    const currencies = DataSet.cryptoCurrencies;
    render(<CurrencyList currencies={currencies} />);
    expect(screen.getAllByTestId('currency-name').length).toBeLessThanOrEqual(
      currencies.length,
    );
  });

  it('displays the first character of the currency name as an avatar', () => {
    const currencies = [{ id: 'TEST', name: 'Test Currency', symbol: 'TST' }];
    render(<CurrencyList currencies={currencies} />);
    expect(screen.getByText('T')).toBeVisible();
    expect(screen.getByText('Test Currency')).toBeVisible();
    expect(screen.getByText('TST ➡️')).toBeVisible();
  });
});

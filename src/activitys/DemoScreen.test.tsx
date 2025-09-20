import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { DataSet } from '../configs/sample-data';
import * as appHooks from '../state/hooks/app';

import { clearCurrencyList, setCurrencyList } from '../state/actions/app';
import DemoScreen from './DemoScreen';

describe('DemoScreen', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (appHooks.useCurrencyList as jest.Mock).mockReturnValue([]);
  });

  it('renders loading state correctly', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    render(<DemoScreen />);
    expect(screen.getByText('Loading...')).toBeVisible();
  });

  it('renders error state correctly', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    render(<DemoScreen />);
    expect(screen.getByText('Error fetching data.')).toBeVisible();
  });

  it('renders currency list on successful data fetch', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [...DataSet.cryptoCurrencies, ...DataSet.fiatCurrencies],
      isLoading: false,
      isError: false,
    });
    (appHooks.useCurrencyList as jest.Mock).mockReturnValue(
      [...DataSet.cryptoCurrencies, ...DataSet.fiatCurrencies],
    );

    render(<DemoScreen />);
    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.queryByText('Error fetching data.')).toBeNull();

    // Check if a specific item from the list is rendered
    expect(screen.getByText('Bitcoin')).toBeVisible();
  });

  it('dispatches `setCurrencyList` action on successful data fetch', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: DataSet.cryptoCurrencies,
      isLoading: false,
      isError: false,
    });

    render(<DemoScreen />);
    
    // Check if the useEffect hook dispatched the action
    expect(mockDispatch).toHaveBeenCalledWith(setCurrencyList(DataSet.cryptoCurrencies));
  });

  it('filters currencies based on search text', async () => {
    const allData = [...DataSet.cryptoCurrencies, ...DataSet.fiatCurrencies];
    (useQuery as jest.Mock).mockReturnValue({
      data: allData,
      isLoading: false,
      isError: false,
    });
    (appHooks.useCurrencyList as jest.Mock).mockReturnValue(allData);

    render(<DemoScreen />);

    // Simulate typing "bit" into the search box
    const searchInput = screen.getByPlaceholderText('Search currency or symbol');
    fireEvent.changeText(searchInput, 'bit');

    // Only Bitcoin and Bitcoin Cash should be visible
    expect(screen.getByText('Bitcoin')).toBeVisible();
    expect(screen.getByText('Bitcoin Cash')).toBeVisible();
    expect(screen.queryByText('Ethereum')).toBeNull();


    // Let's directly call the function to be simpler for this example
    fireEvent.changeText(searchInput, '');
    expect(screen.getByText('Ethereum')).toBeVisible();
  });

  // Test the button presses
  it('dispatches `clearCurrencyList` when "Clear DB" button is pressed', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: [], isLoading: false, isError: false });
    render(<DemoScreen />);

    const clearButton = screen.getByText('🗑 Clear DB');
    fireEvent.press(clearButton);
    expect(mockDispatch).toHaveBeenCalledWith(clearCurrencyList());
  });

  it('dispatches `setCurrencyList` when "Insert DB" button is pressed', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: DataSet.fiatCurrencies, isLoading: false, isError: false });
    render(<DemoScreen />);

    const insertButton = screen.getByText('💾 Insert DB');
    fireEvent.press(insertButton);
    expect(mockDispatch).toHaveBeenCalledWith(setCurrencyList(DataSet.fiatCurrencies));
  });

  it('changes currency type and refetches data', () => {
    const mockUseQuery = (useQuery as jest.Mock);
    
    // Mock initial state
    mockUseQuery.mockReturnValue({ data: DataSet.cryptoCurrencies, isLoading: false, isError: false });
    (appHooks.useCurrencyList as jest.Mock).mockReturnValue(DataSet.cryptoCurrencies);

    const { rerender } = render(<DemoScreen />);
    
    // Assert initial state is Crypto
    expect(screen.getByText('Bitcoin')).toBeVisible();
    expect(screen.queryByText('Singapore Dollar')).toBeNull();

    // Simulate pressing the 'Fiat' button.
    const fiatButton = screen.getByText('Fiat');
    fireEvent.press(fiatButton);

    // Mock the new query data. The component re-renders with the new mock value.
    mockUseQuery.mockReturnValue({ data: DataSet.fiatCurrencies, isLoading: false, isError: false });
    (appHooks.useCurrencyList as jest.Mock).mockReturnValue(DataSet.fiatCurrencies);
    rerender(<DemoScreen />);
    
    // The screen should now show fiat currencies
    expect(screen.queryByText('Bitcoin')).toBeNull();
    expect(screen.getByText('Singapore Dollar')).toBeVisible();
  });

});
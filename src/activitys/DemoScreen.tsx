import React, { useState } from 'react';
import { View, Button } from 'react-native';
// import { useDispatch } from 'react-redux';
import CurrencyList from './fragments/CurrencyList';
import { DataSet } from '../configs/sample-data';

const { cryptoCurrencies, fiatCurrencies } = DataSet;

const DemoScreen = () => {
  // const dispatch = useDispatch();
  const [currencyType, setCurrencyType] = useState('crypto');

  const handleClearData = () => {
    // dispatch(clearDatabase());
  };

  const handleInsertData = () => {
    // This button needs to determine what data to insert, either crypto or fiat
    // based on a simple state or a more complex logic.
    // For simplicity, this example will just insert one type.
    // dispatch(insertDataIntoDatabase(cryptoCurrencies));
  };

  return (
    <View className="flex-1 p-4">
      <View className="flex-row justify-between mb-4">
        <Button title="Clear DB" onPress={handleClearData} />
        <Button title="Insert DB" onPress={handleInsertData} />
        <Button title="Crypto List" onPress={() => setCurrencyType('crypto')} />
        <Button title="Fiat List" onPress={() => setCurrencyType('fiat')} />
        <Button title="All" onPress={() => setCurrencyType('all')} />
      </View>
      <CurrencyList
        currencies={
          currencyType === 'crypto' ? cryptoCurrencies : fiatCurrencies
        }
      />
    </View>
  );
};

export default DemoScreen;

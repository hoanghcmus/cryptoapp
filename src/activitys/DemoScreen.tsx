import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query'; 
import { fetchCurrencies } from '../services/api'; 
import CurrencyList from './fragments/CurrencyList';

const DemoScreen = () => {
  const [currencyType, setCurrencyType] = useState('crypto');

  // Use the useQuery hook here to fetch data based on currencyType
  const { data, isLoading, isError } = useQuery({
    queryKey: ['currencies', currencyType],
    queryFn: () => fetchCurrencies(currencyType as 'crypto' | 'fiat' | 'all'),
  });

  const handleClearData = () => {
    // dispatch(clearDatabase());
  };

  const handleInsertData = () => {
    // Placeholder for insertion logic
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
      {isLoading ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text>Error fetching data.</Text>
      ) : (
        <CurrencyList currencies={data || []} />
      )}
    </View>
  );
};

export default DemoScreen;
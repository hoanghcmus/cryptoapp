import React, { useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrencies } from '../../services/api';

type Currency = {
  id: string;
  name: string;
  symbol: string;
  code?: string; // Only for fiat currencies
};

type CurrencyListProps = {
  currencies: Currency[];
};

const CurrencyList: React.FC<CurrencyListProps> = ({ currencies }) => {
  const [searchText, setSearchText] = useState('');
  const { isLoading, isError } = useQuery({
    queryKey: ['cryptoCurrencies', 'all'],
    queryFn: ({ queryKey }) =>
      fetchCurrencies(queryKey[1] as 'crypto' | 'fiat' | 'all'),
  });

  const filteredCurrencies = currencies.filter((currency: any) =>
    currency.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderItem = ({ item }: any) => (
    <View className="p-4 border-b border-gray-300">
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text>{item.symbol}</Text>
    </View>
  );

  const EmptyView = () => (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-xl text-gray-500">No currencies found.</Text>
    </View>
  );

  return (
    <View className="flex-1">
      <TextInput
        placeholder="Search currencies..."
        value={searchText}
        onChangeText={setSearchText}
        className="p-3 mb-4 border border-gray-400 rounded-md"
      />
      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Error fetching data.</Text>}
      <FlatList
        data={searchText ? filteredCurrencies : currencies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptyView}
      />
    </View>
  );
};

export default CurrencyList;

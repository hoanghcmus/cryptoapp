import React, { useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';

type Currency = {
  id: string;
  name: string;
  symbol: string;
  code?: string;
};

type CurrencyListProps = {
  currencies: Currency[];
};

const EmptyView = () => (
  <View className="flex-1 justify-center items-center p-4">
    <Text className="text-xl text-gray-500">No currencies found.</Text>
  </View>
);

const renderItem = ({ item }: { item: Currency }) => (
  <View className="p-4 border-b border-gray-300">
    <Text className="text-lg font-bold">{item.name}</Text>
    <Text>{item.symbol}</Text>
  </View>
);

const CurrencyList: React.FC<CurrencyListProps> = ({ currencies }) => {
  const [searchText, setSearchText] = useState('');

  const filteredCurrencies = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View className="flex-1">
      <TextInput
        placeholder="Search currencies..."
        value={searchText}
        onChangeText={setSearchText}
        className="p-3 mb-4 border border-gray-400 rounded-md"
      />
      <FlatList
        data={searchText ? filteredCurrencies : currencies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyView}
      />
    </View>
  );
};

export default CurrencyList;
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import EmptyState from '../../components/EmptyState';
import { Currency } from '../../data-types/crypto';

type CurrencyListProps = {
  currencies: Currency[];
};

const EmptyView = () => <EmptyState message="No Currencies found" />;

const CurrencyList: React.FC<CurrencyListProps> = ({ currencies }) => {
  const renderItem = ({ item }: { item: Currency }) => {
    const firstChar = item.name?.charAt(0).toUpperCase() || '?';

    return (
      <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
        <View className="flex-row items-center space-x-3">
          {/* Circle Avatar with first character */}
          <View className="w-10 h-10 rounded-full bg-gray-700 justify-center items-center mr-2">
            <Text className="text-white text-lg font-bold">{firstChar}</Text>
          </View>

          {/* Currency Name */}
          <Text testID="currency-name" className="text-white text-lg">
            {item.name}
          </Text>
        </View>

        {/* Symbol with arrow */}
        <Text className="text-gray-400 text-base">{item.symbol} ➡️</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={currencies}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListEmptyComponent={EmptyView}
      removeClippedSubviews={true}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
    />
  );
};

export default CurrencyList;

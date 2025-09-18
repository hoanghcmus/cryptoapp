import React from "react";
import { View, Text, FlatList } from "react-native";

type Currency = {
  id: string;
  name: string;
  symbol: string;
  code?: string; // Only for fiat currencies
};

type CurrencyListProps = {
  currencies: Currency[];
};

const EmptyView = () => (
  <View className="flex-1 justify-center items-center p-4">
    <Text className="text-lg text-gray-500">No currencies found.</Text>
  </View>
);

const CurrencyList: React.FC<CurrencyListProps> = ({ currencies }) => {
  const renderItem = ({ item }: { item: Currency }) => (
    <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
      <View className="flex-row items-center space-x-2">
        <View
          className={`px-2 py-1 rounded-md ${
            item.code ? "bg-gray-700" : "bg-blue-900"
          } mr-2`}
        >
          <Text className="text-blue-400 font-semibold capitalize">
            {item.code ? "Fiat" : "Crypto"}
          </Text>
        </View>
        <Text className="text-white text-lg">{item.name}</Text>
      </View>
      <Text className="text-gray-400 text-base">{item.symbol}</Text>
    </View>
  );

  return (
    <FlatList
      data={currencies}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={EmptyView}
      removeClippedSubviews={true}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
    />
  );
};

export default CurrencyList;

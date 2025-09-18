import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrencies } from "../services/api";
import CurrencyList from "./fragments/CurrencyList";

const DemoScreen = () => {
  const [currencyType, setCurrencyType] = useState<"crypto" | "fiat" | "all">(
    "all"
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["currencies", currencyType],
    queryFn: () => fetchCurrencies(currencyType),
  });

  const handleClearData = () => {
    // dispatch(clearDatabase());
  };

  const handleInsertData = () => {
    // Placeholder for insertion logic
  };

  return (
    <View className="flex-1 bg-black p-4">
      {/* Header */}
      <Text className="text-white text-2xl font-bold mb-4">Currencies</Text>

      {/* DB Buttons */}
      <View className="flex-row space-x-3 mb-4">
        <TouchableOpacity
          onPress={handleClearData}
          className="flex-1 bg-[#0d1b2a] border border-blue-500 rounded-md p-3 items-center"
        >
          <Text className="text-blue-400 font-semibold">🗑 Clear DB</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleInsertData}
          className="flex-1 bg-blue-600 rounded-md p-3 items-center"
        >
          <Text className="text-white font-semibold">💾 Insert DB</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row mb-4">
        {["all", "crypto", "fiat", ].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setCurrencyType(type as any)}
            className={`flex-1 p-3 mx-1 rounded-md items-center ${
              currencyType === type ? "bg-blue-600" : "bg-[#1c1c1c]"
            }`}
          >
            <Text
              className={`font-semibold ${
                currencyType === type ? "text-white" : "text-gray-400"
              }`}
            >
              {type === "crypto"
                ? "Crypto"
                : type === "fiat"
                ? "Fiat"
                : "All Currencies"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Currency List */}
      {isLoading ? (
        <Text className="text-gray-400">Loading...</Text>
      ) : isError ? (
        <Text className="text-red-400">Error fetching data.</Text>
      ) : (
        <CurrencyList currencies={data || []} />
      )}
    </View>
  );
};

export default DemoScreen;

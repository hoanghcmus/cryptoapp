import React, { useMemo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrencies } from '../services/api';
import CurrencyList from './fragments/CurrencyList';
import { normalize } from '../utils/string';
import CryptoButton from '../components/CrytoButton';
import SearchBox from '../components/SearchBox';
import { useDispatch } from 'react-redux';
import { clearCurrencyList, setCurrencyList } from '../state/actions/app';
import { useCurrencyList } from '../state/hooks/app';

const DemoScreen = () => {
  const dispatch = useDispatch();

  const [currencyType, setCurrencyType] = useState<'crypto' | 'fiat' | 'all'>(
    'all',
  );
  const [searchText, setSearchText] = useState('');

  const localData = useCurrencyList();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['currencies', currencyType],
    queryFn: () => fetchCurrencies(currencyType),
  });

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      dispatch(setCurrencyList(data));
    }
  }, [data]);

  const clearSearch = () => setSearchText('');
  const handleClearData = () => dispatch(clearCurrencyList());
  const handleInsertData = () => {
    if (Array.isArray(data) && data.length > 0) {
      dispatch(setCurrencyList(data));
    }
  };

  const filteredCurrencies = useMemo(() => {
    const source = localData || [];
    if (!searchText) return source;

    const q = normalize(searchText);

    return source.filter(currency => {
      const name = normalize(currency.name);
      const symbol = normalize(currency.symbol);

      return (
        name.startsWith(q) || name.includes(' ' + q) || symbol.startsWith(q)
      );
    });
  }, [searchText, localData]);

  // Decide what to render
  let content;
  if (isLoading && (!localData || localData.length === 0)) {
    content = <Text className="text-gray-400">Loading...</Text>;
  } else if (isError && (!localData || localData.length === 0)) {
    content = <Text className="text-red-400">Error fetching data.</Text>;
  } else {
    content = <CurrencyList currencies={filteredCurrencies} />;
  }

  return (
    <View className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-4">Currencies</Text>

      {/* DB Buttons */}
      <View className="flex-row space-x-3 mb-4">
        <CryptoButton
          title="🗑 Clear DB"
          onPress={handleClearData}
          className="bg-[#0d1b2a] border border-blue-500 rounded-md p-3 items-center mr-2"
          titleClassName="text-blue-400"
        />
        <CryptoButton
          title="💾 Insert DB"
          onPress={handleInsertData}
          className="bg-blue-600 rounded-md p-3 items-center"
          titleClassName="text-white"
        />
      </View>

      {/* Search Box */}
      <SearchBox
        placeholder="Search currency or symbol"
        keyword={searchText}
        onSearch={setSearchText}
        onClearSearch={clearSearch}
      />

      {/* Filter Tabs */}
      <View className="flex-row mb-4">
        {['all', 'crypto', 'fiat'].map(type => {
          const onFilter = () => setCurrencyType(type as any);
          const title =
            type === 'crypto' ? 'Crypto' : type === 'fiat' ? 'Fiat' : 'All';
          return (
            <CryptoButton
              key={type}
              title={title}
              onPress={onFilter}
              className={`flex-1 p-3 mx-1 rounded-md items-center ${
                currencyType === type ? 'bg-blue-600' : 'bg-[#1c1c1c]'
              }`}
              titleClassName={`font-semibold ${
                currencyType === type ? 'text-white' : 'text-gray-400'
              }`}
            />
          );
        })}
      </View>

      {/* Currency List or Loading/Error */}
      {content}
    </View>
  );
};

export default DemoScreen;

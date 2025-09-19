import React from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import clsx from 'clsx';

interface SearchBoxProps {
  placeholder?: string;
  keyword: string;
  className?: string;
  textClassName?: string;
  onSearch: (text: string) => void;
  onClearSearch: () => void;
}

const SearchBox = (props: SearchBoxProps) => {
  const {
    placeholder,
    keyword,
    className,
    textClassName,
    onSearch,
    onClearSearch,
  } = props;
  return (
    <View
      className={clsx(
        'flex-row items-center bg-[#1c1c1c] rounded-md px-3 py-2 mb-4',
        className,
      )}>
      <TouchableOpacity
        className="w-[40] h-[40] items-center justify-center"
        onPress={onClearSearch}>
        {keyword.length > 0 ? (
          <Text className="text-gray-400">⬅️</Text>
        ) : (
          <Text className="text-gray-400 mr-2">🔍</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={keyword}
        onChangeText={onSearch}
        className={clsx('flex-1 text-white px-1', textClassName)}
      />
      {keyword.length > 0 && (
        <TouchableOpacity
          className="w-[40] h-[40] items-center justify-center"
          onPress={onClearSearch}>
          <Text className="text-gray-400">✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBox;

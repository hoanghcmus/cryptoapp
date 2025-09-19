import React from 'react';
import { Text, View } from 'react-native';
import clsx from 'clsx';

interface EmptyStateProps {
  message: string;
  className?: string;
  messageClassName?: string;
}

const EmptyState = (props: EmptyStateProps) => {
  const { message, className, messageClassName } = props;
  return (
    <View className={clsx('flex-1 justify-center items-center p-4', className)}>
      <Text className={clsx('text-lg text-gray-500', messageClassName)}>
        {message}
      </Text>
    </View>
  );
};

export default EmptyState;

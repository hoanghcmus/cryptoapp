import React from 'react';
import {TouchableOpacity, Text, ButtonProps} from 'react-native';
import clsx from 'clsx'; 

interface CryptoButtonProps extends ButtonProps {
  title: string;
  className?: string;
  titleClassName?: string;
  onPress: () => void;
}

const CryptoButton = (props: CryptoButtonProps) => {
  const {title, className, titleClassName, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
     className={clsx('rounded-md items-center', className)}>
      <Text className={clsx('font-semibold text-white', titleClassName)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CryptoButton;

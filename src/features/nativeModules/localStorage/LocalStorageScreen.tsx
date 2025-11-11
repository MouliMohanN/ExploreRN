import React from 'react';
import { Text, View } from 'react-native';
import { ScreenConfig } from '../../../common/navigation/conventions';
import { ScreenBaseProps } from '../../../common/types/ScreenBaseProps';

export default function LocalStorageScreen({}: ScreenBaseProps): React.ReactElement {
  return (
    <View>
      <Text>LocalStorage Screen</Text>
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'LocalStorage',
  component: LocalStorageScreen,
  options: {
    headerShown: true,
    title: 'LocalStorage Screen',
  },
};

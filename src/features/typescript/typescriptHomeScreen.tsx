import React from 'react';
import { Text, View } from 'react-native';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';
import { ScreenConfig } from '../../common/navigation/conventions';

export default function typescriptHomeScreen({ navigation }: ScreenBaseProps): React.ReactElement {
  return (
    <View>
      <Text>typescriptHome Screen</Text>
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'typescriptHome',
  component: typescriptHomeScreen,
  options: {
    headerShown: true,
    title: 'typescriptHome Screen',
  },
};

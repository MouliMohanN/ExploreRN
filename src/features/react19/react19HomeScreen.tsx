import React from 'react';
import { Text, View } from 'react-native';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';
import { ScreenConfig } from '../../common/navigation/conventions';

export default function react19HomeScreen({ navigation }: ScreenBaseProps): React.ReactElement {
  return (
    <View>
      <Text>react19Home Screen</Text>
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'react19Home',
  component: react19HomeScreen,
  options: {
    headerShown: true,
    title: 'react19Home Screen',
  },
};

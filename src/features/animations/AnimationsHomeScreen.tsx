import React from 'react';
import { Text, View } from 'react-native';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';
import { ScreenConfig } from '../../common/navigation/conventions';

export default function AnimationsHomeScreen({ navigation }: ScreenBaseProps): React.ReactElement {
  return (
    <View>
      <Text>AnimationsHome Screen</Text>
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'AnimationsHome',
  component: AnimationsHomeScreen,
  options: {
    headerShown: true,
    title: 'AnimationsHome Screen',
  },
};

import React from 'react';
import { Text, View } from 'react-native';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';
import { ScreenConfig } from '../../common/navigation/conventions';

export default function EventBusScreen(): React.ReactElement {
  return (
    <View>
      <Text>EventBusScreen</Text>
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'EventBus',
  component: EventBusScreen,
  options: {
    headerShown: true,
    title: 'EventBus',
  },
};

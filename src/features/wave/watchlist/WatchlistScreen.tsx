import React from 'react';
import { Text, View } from 'react-native';
import { ScreenConfig } from '../../../common/navigation/conventions';
import { ScreenBaseProps } from '../../../common/types/ScreenBaseProps';

export default function WatchlistScreen({}: ScreenBaseProps): React.ReactElement {
  return (
    <View>
      <Text>Watchlist Screen</Text>
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'Watchlist',
  component: WatchlistScreen,
  options: {
    headerShown: true,
    title: 'Watchlist Screen',
  },
};

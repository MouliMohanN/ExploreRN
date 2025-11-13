import React from 'react';
import { View } from 'react-native';
import { Button } from '../../common/components/Button';
import { ScreenNames } from '../../common/navigation';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

export default function WaveHomeScreen({ navigation }: ScreenBaseProps): React.ReactElement {
  return (
    <View>
      <Button title='Watchlist (old)' onPress={() => navigation.navigate(ScreenNames.WatchlistLegacy)} />
      <Button title='Watchlist (new)' onPress={() => navigation.navigate(ScreenNames.Watchlist)} />
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'WaveHome',
  component: WaveHomeScreen,
  options: {
    headerShown: true,
    title: 'WaveHome Screen',
  },
};

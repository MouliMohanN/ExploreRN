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
      <Button title='Watchlist (EditText)' onPress={() => navigation.navigate(ScreenNames.WatchlistEditText)} />
      <Button
        title='Watchlist (compound pattern)'
        onPress={() => navigation.navigate(ScreenNames.WatchlistCompoundPatternAi)}
      />
      <Button
        title='Watchlist (compound pattern with eventbus)'
        onPress={() => navigation.navigate(ScreenNames.WatchlistCompoundPatternWithEventBus)}
      />
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

import React from 'react';
import { View } from 'react-native';
import { Button } from '../../common/components/Button';
import { ScreenNames } from '../../common/navigation';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

export default function NativeModulesHomeScreen({ navigation }: ScreenBaseProps): React.ReactElement {
  return (
    <View>
      <Button title='LocalStorage' onPress={() => navigation.navigate(ScreenNames.LocalStorage)} />
      <Button title='NitroStorage' onPress={() => navigation.navigate(ScreenNames.NitroLocalStorage)} />
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'NativeModulesHome',
  component: NativeModulesHomeScreen,
  options: {
    headerShown: true,
    title: 'NativeModulesHome Screen',
  },
};

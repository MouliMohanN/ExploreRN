import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

export default function InputTextScreenScreen({}: ScreenBaseProps): React.ReactElement {
  return (
    <View>
      <Text>InputTextScreen Screen</Text>
      <TextInput placeholder='Type here' />
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'InputTextScreen',
  component: InputTextScreenScreen,
  options: {
    headerShown: true,
    title: 'InputTextScreen Screen',
  },
};

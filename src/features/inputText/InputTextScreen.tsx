import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

export default function InputTextScreen({}: ScreenBaseProps): React.ReactElement {
  return (
    <View>
      <Text>InputText Screen</Text>
      <TextInput placeholder='Type here' />
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'InputText',
  component: InputTextScreen,
  options: {
    headerShown: true,
    title: 'InputText Screen',
  },
};

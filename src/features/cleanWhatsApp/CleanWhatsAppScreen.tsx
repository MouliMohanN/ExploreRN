import React from 'react';
import { Text, View } from 'react-native';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

export default function CleanWhatsAppScreen({ navigation }: ScreenBaseProps): React.ReactElement {
  return (
    <View>
      <Text>CleanWhatsApp Screen</Text>
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'CleanWhatsApp',
  component: CleanWhatsAppScreen,
  options: {
    headerShown: true,
    title: 'CleanWhatsApp Screen',
  },
};

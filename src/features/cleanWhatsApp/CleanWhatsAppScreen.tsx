import React from 'react';
import { Text, View } from 'react-native';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';
import { ScreenConfig } from '../../common/navigation/conventions';

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

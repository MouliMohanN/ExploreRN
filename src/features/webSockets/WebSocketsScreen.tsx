import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';
import { initWebSocket } from './service';

export const WebSocketsScreen: React.FC<ScreenBaseProps> = () => {
  useEffect(() => {
    initWebSocket('ws://host.com/path', {
      onopen: () => {},
      onmessage: () => {},
      onerror: () => {},
      onclose: () => {},
    });
  }, []);

  return (
    <View>
      <Text>WebSocketsScreen</Text>
    </View>
  );
};

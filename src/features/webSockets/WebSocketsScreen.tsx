import React from 'react';
import { Text, View } from 'react-native';
import { ScreenConfig } from '../../common/navigation/conventions';
import { initWebSocket } from './service';

export default function WebSocketsScreen() {
  const webSocket = initWebSocket('wss://ws.coinapi.io/v1/', {
    onopen: () => {
      webSocket.send(
        JSON.stringify({
          type: 'hello',
          apikey: '5b563400-e6ea-4328-9021-b4a55ffa430e',
          subscribe_data_type: ['trade'],
          subscribe_filter_symbol_id: ['BITSTAMP_SPOT_BTC_USD$', 'BITFINEX_SPOT_BTC_LTC$'],
        }),
      );
    },
    onmessage: () => {},
    onerror: () => {},
    onclose: () => {},
  });
  return (
    <View>
      <Text>WebSocketsScreen</Text>
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'WebSockets',
  component: WebSocketsScreen,
  options: {
    title: 'WebSockets Demo',
    headerShown: true,
  },
};

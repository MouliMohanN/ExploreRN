import { ScreenNames } from '.';
import { WebSocketsScreen } from '../../features/webSockets/WebSocketsScreen';

export const WebSocketsFeatureScreen = {
  WebSockets: 'WebSockets',
};

export const WebSocketsFeatureScreens = [
  {
    name: ScreenNames.WebSockets,
    component: WebSocketsScreen,
    options: {
      headerShown: true,
      title: 'WebSockets',
    },
  },
];

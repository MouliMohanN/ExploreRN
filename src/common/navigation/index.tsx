import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../../MainScreen';
import { EventBusFeatureScreen, EventBusFeatureScreens } from './eventBus';
import { LogFeatureScreen, LogFeatureScreens } from './logFeature';
import { TabViewFeatureScreen, TabViewFeatureScreens } from './tabViewFeature';
import { WebSocketsFeatureScreen, WebSocketsFeatureScreens } from './webSockets';

export const ScreenNames = {
  Main: 'Main',
  ...LogFeatureScreen,
  ...TabViewFeatureScreen,
  ...WebSocketsFeatureScreen,
  ...EventBusFeatureScreen,
};

export const RootStack = createNativeStackNavigator();

export const RootStackScreens = [
  {
    name: ScreenNames.Main,
    component: MainScreen,
    options: {
      headerShown: true,
    },
  },
  ...LogFeatureScreens,
  ...TabViewFeatureScreens,
  ...WebSocketsFeatureScreens,
  ...EventBusFeatureScreens,
];

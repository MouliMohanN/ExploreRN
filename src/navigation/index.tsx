import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogContentScreen } from '../screens/LogContentScreen';
import { LogViewerScreen } from '../screens/LogViewerScreen';
import { MainScreen } from '../screens/MainScreen';

export const ScreenNames = {
  Main: 'Main',
  LogViewer: 'LogViewer',
  LogContent: 'LogContent',
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
  {
    name: ScreenNames.LogViewer,
    component: LogViewerScreen,
    options: {
      headerShown: true,
      title: 'Available Logs',
    },
  },
  {
    name: ScreenNames.LogContent,
    component: LogContentScreen,
    options: {
      headerShown: true,
      title: 'Log Content',
    },
  },
];

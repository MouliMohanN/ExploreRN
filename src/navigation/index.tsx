import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreen} from '../screens/MainScreen';
import {LogViewerScreen} from '../screens/LogViewerScreen';
import {LogContentScreen} from '../screens/LogContentScreen';

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
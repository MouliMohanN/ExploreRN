import 'react-native-gesture-handler';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreen} from '../screens/MainScreen';
import {LogViewerScreen} from '../screens/LogViewerScreen';
import {LogContentScreen} from '../screens/LogContentScreen';

export const ScreenNames = {
  Main: 'Main',
  LogViewer: 'LogViewer',
  LogContent: 'LogContent',
};

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Main',
  screens: {
    [ScreenNames.Main]: {
      screen: MainScreen,
      options: {
        headerShown: true,
      },
    },
    [ScreenNames.LogViewer]: {
      screen: LogViewerScreen,
      options: {
        headerShown: true,
        title: 'Available Logs',
      },
    },
    [ScreenNames.LogContent]: {
      screen: LogContentScreen,
      options: {
        headerShown: true,
        title: 'Log Content',
      },
    },
  },
});

export const RootNavigation = createStaticNavigation(RootStack);

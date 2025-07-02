import 'react-native-gesture-handler';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreen} from '../screens/MainScreen';
import {LogViewerScreen} from '../screens/LogViewerScreen';

export const ScreenNames = {
  Main: 'Main',
  LogViewer: 'LogViewer',
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
        title: 'Application Logs',
      },
    },
  },
});

export const RootNavigation = createStaticNavigation(RootStack);

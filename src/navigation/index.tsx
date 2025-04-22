import 'react-native-gesture-handler';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreen} from '../screens/MainScreen';

export const ScreenNames = {
  Main: 'Main',
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
  },
});

export const RootNavigation = createStaticNavigation(RootStack);

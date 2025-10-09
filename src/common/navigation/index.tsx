import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../../MainScreen';
import { getAllScreens, getScreenNames } from './generated/screenRegistry';

// Auto-discovered screen names - no manual management needed!
export const ScreenNames = {
  Main: 'Main',
  ...getScreenNames(),
};

export const RootStack = createNativeStackNavigator();

// Auto-discovered screens + Main screen - no manual management needed!
export const RootStackScreens = [
  {
    name: 'Main',
    component: MainScreen,
    options: {
      headerShown: true,
    },
  },
  ...getAllScreens().map((screenConfig) => ({
    name: screenConfig.name,
    component: screenConfig.component,
    options: screenConfig.options || {},
  })),
];

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAllScreens, getScreenNames } from './generated/screenRegistry';
import React from 'react';

const MainScreen = React.lazy(() =>
  import('../../MainScreen').then((module) => ({ default: module.MainScreen }))
);

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
  ...getAllScreens().map(screenConfig => ({
    name: screenConfig.name,
    component: screenConfig.component,
    options: screenConfig.options || {},
  })),
];

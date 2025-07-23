import React, { useState } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';
import { CounterContext } from './CounterContext';
import { TabViewScreen1 } from './screens/TabViewScreen1';
import { TabViewScreen2 } from './screens/TabViewScreen2';

const Tab = createMaterialTopTabNavigator();

export const TabViewReactNavigationScreen: React.FC<ScreenBaseProps> = ({}) => {
  const [count, setCount] = useState(0);
  return (
    <CounterContext.Provider value={{ count, setCount }}>
      <Tab.Navigator screenOptions={{ lazy: true }}>
        <Tab.Screen name='screen1' component={TabViewScreen1} />
        <Tab.Screen name='screen2' component={TabViewScreen2} />
      </Tab.Navigator>
    </CounterContext.Provider>
  );
};

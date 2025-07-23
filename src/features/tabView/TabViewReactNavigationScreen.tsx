import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';
import { CounterContext, useCounter } from './CounterContext';
import { TabViewScreen1 } from './screens/TabViewScreen1';
import { TabViewScreen2 } from './screens/TabViewScreen2';

const Tab = createMaterialTopTabNavigator();

const tabs = [
  { name: 'screen1', component: TabViewScreen1 },
  { name: 'screen2', component: TabViewScreen2 },
  { name: 'screen3', component: TabViewScreen1 },
  { name: 'screen4', component: TabViewScreen2 },
  { name: 'screen5', component: TabViewScreen1 },
  { name: 'screen6', component: TabViewScreen2 },
];

export const TabViewReactNavigationScreen: React.FC<ScreenBaseProps> = () => {
  const { count, setCount } = useCounter();
  return (
    <CounterContext.Provider value={{ count, setCount }}>
      <Tab.Navigator screenOptions={{ lazy: true }}>
        {tabs.map((tab) => (
          <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
        ))}
      </Tab.Navigator>
    </CounterContext.Provider>
  );
};

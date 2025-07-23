import React from 'react';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabViewScreen1 } from './screens/TabViewScreen1';
import { TabViewScreen2 } from './screens/TabViewScreen2';

// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

// const Screen1 = () => {
//   return (
//     <View>
//       <Text>Screen 1</Text>
//     </View>
//   );
// };

// const Screen2 = () => {
//   return (
//     <View>
//       <Text>Screen 2</Text>
//     </View>
//   );
// };

export const TabViewReactNavigationScreen: React.FC<ScreenBaseProps> = ({}) => {
  return (
    <Tab.Navigator screenOptions={{ lazy: true }}>
      <Tab.Screen name='screen1' component={TabViewScreen1} />
      <Tab.Screen name='screen2' component={TabViewScreen2} />
    </Tab.Navigator>
  );
};

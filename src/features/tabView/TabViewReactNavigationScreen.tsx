import React, { useState } from 'react';
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
  const [count, setCount] = useState(0);
  return (
    <Tab.Navigator screenOptions={{ lazy: true }}>
      <Tab.Screen name='screen1'>
        {(props) => <TabViewScreen1 {...props} count={count} setCount={setCount} />}
      </Tab.Screen>
      <Tab.Screen name='screen2'>
        {(props) => <TabViewScreen2 {...props} count={count} setCount={setCount} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

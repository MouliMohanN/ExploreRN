import { NavigationContainer } from '@react-navigation/native';
import React, { Suspense, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootStack, RootStackScreens, ScreenNames } from './common/navigation';
import { logger } from './common/utils/logger/logger';

const App = () => {
  useEffect(() => {}, []);

  logger.info('App.tsx rendered');
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Suspense
          fallback={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator />
            </View>
          }
        >
          <RootStack.Navigator initialRouteName={ScreenNames.Main}>
            {RootStackScreens.map((screen) => (
              <RootStack.Screen
                key={screen.name}
                name={screen.name}
                component={screen.component}
                options={screen.options}
              />
            ))}
          </RootStack.Navigator>
        </Suspense>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

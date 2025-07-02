import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack, ScreenNames, RootStackScreens } from './navigation';
import { setLoggerConfig } from './common/utils/logger/logger';
import { LogLevel } from './common/utils/logger/types';

const App = () => {
  useEffect(() => {
    setLoggerConfig({
      logLevel: LogLevel.INFO, // Set the desired log level
      loggers: ['console', 'file', 'network'], // Specify the loggers to use
    });
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={ScreenNames.Main}>
        {RootStackScreens.map(screen => (
          <RootStack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ))}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
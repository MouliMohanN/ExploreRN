import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { setLoggerConfig } from './common/utils/logger/logger';
import { RootStack, RootStackScreens, ScreenNames } from './navigation';

const App = () => {
  useEffect(() => {
    setLoggerConfig({
      shouldLog: true, // Enable logging
      loggers: ['console', 'file'], // Specify the loggers to use
      loggersConfig: {
        console: {
          logLevel: {
            info: false, // Log INFO level messages
            debug: true, // Log DEBUG level messages
            warn: true, // Log WARN level messages
            error: true, // Log ERROR level messages
          },
        },
        file: {
          logLevel: {
            info: false,
            debug: true,
            warn: true,
            error: true,
          },
          logRetentionHours: 24, // Retain logs for 24 hours
          cleanupDelayMs: 20000, // Delay before cleaning old logs
          logSeparator: '\n', // Separator between log entries in the file
        },
      },
    });
  }, []);

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default App;

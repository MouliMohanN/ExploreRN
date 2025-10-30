/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import { setLoggerConfig } from './src/common/utils/logger/logger';

setLoggerConfig({
      shouldLog: true, // Enable logging
      loggers: ['console', 'file'], // Specify the loggers to use
      loggersConfig: {
        console: {
          logLevel: {
            info: true, // Log INFO level messages
            debug: true, // Log DEBUG level messages
            warn: true, // Log WARN level messages
            error: true, // Log ERROR level messages
          },
        },
        file: {
          logLevel: {
            info: true,
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
AppRegistry.registerComponent(appName, () => App);

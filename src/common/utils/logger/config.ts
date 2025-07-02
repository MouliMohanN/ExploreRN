import { LogLevel, LoggerConfig } from './types';

const config: LoggerConfig = {
  logLevel: LogLevel.INFO, // Default log level
  loggers: ['console'], // Default to console logging
  fileConfig: {
    logRetentionHours: 24, // Default to 24 hours
  },
};

export default config;

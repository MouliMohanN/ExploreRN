import { LogLevel, LoggerConfig } from './types';

const config: LoggerConfig = {
  logLevel: LogLevel.INFO, // Default log level
  loggers: ['console'], // Default to console logging
};

export default config;

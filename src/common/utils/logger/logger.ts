import { LogLevel, LoggerConfig } from './types';
import { consoleLogger } from './loggers/consoleLogger';
import { fileLogger } from './loggers/fileLogger';
import { networkLogger } from './loggers/networkLogger';
import defaultConfig from './config';

let currentConfig: LoggerConfig = { ...defaultConfig };

const loggersMap = {
  console: consoleLogger,
  file: fileLogger,
  network: networkLogger,
};

const log = (level: LogLevel, message: string, data?: any) => {
  if (level < currentConfig.logLevel) {
    return;
  }

  currentConfig.loggers.forEach(loggerName => {
    const logger = loggersMap[loggerName];
    if (logger) {
      logger(level, message, data);
    }
  });
};

export const logger = {
  debug: (message: string, data?: any) => log(LogLevel.DEBUG, message, data),
  info: (message: string, data?: any) => log(LogLevel.INFO, message, data),
  warn: (message: string, data?: any) => log(LogLevel.WARN, message, data),
  error: (message: string, data?: any) => log(LogLevel.ERROR, message, data),
};

export const setLoggerConfig = (newConfig: Partial<LoggerConfig>) => {
  currentConfig = { ...currentConfig, ...newConfig };
};
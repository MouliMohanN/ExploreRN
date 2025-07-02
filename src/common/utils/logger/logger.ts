import { LogLevel, ConsoleLoggerConfig, FileLoggerConfig, NetworkLoggerConfig } from './types';
import { consoleLogger } from './loggers/consoleLogger';
import { fileLogger } from './loggers/fileLogger';
import { networkLogger } from './loggers/networkLogger';
import { currentConfig, setLoggerConfig } from './configManager';
import { cleanOldLogs } from './logCleaner';

const loggersMap = {
  console: (level: LogLevel, message: string, data?: any) => consoleLogger(level, message, data, currentConfig.consoleConfig as ConsoleLoggerConfig),
  file: (level: LogLevel, message: string, data?: any) => fileLogger(level, message, data, currentConfig.fileConfig as FileLoggerConfig),
  network: (level: LogLevel, message: string, data?: any) => networkLogger(level, message, data, currentConfig.networkConfig as NetworkLoggerConfig),
};

const log = (level: LogLevel, message: string, data?: any) => {
  if (level < currentConfig.logLevel) {
    return;
  }

  currentConfig.loggers.forEach(loggerName => {
    const loggerFunc = loggersMap[loggerName];
    if (loggerFunc) {
      loggerFunc(level, message, data);
    }
  });
};



export const logger = {
  debug: (message: string, data?: any) => log(LogLevel.DEBUG, message, data),
  info: (message: string, data?: any) => log(LogLevel.INFO, message, data),
  warn: (message: string, data?: any) => log(LogLevel.WARN, message, data),
  error: (message: string, data?: any) => log(LogLevel.ERROR, message, data),
};

export { setLoggerConfig };

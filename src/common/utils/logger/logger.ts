import { currentConfig, setLoggerConfig } from './config/configManager';
import { LoggerContract } from './loggers/LoggerContract';
import { LogMapper } from './loggers/logMapper';
import { LogLevel } from './types/types';

const log = (level: LogLevel, message: string, data?: any) => {
  if (!currentConfig.shouldLog) {
    return;
  }

  currentConfig.loggers.forEach((loggerName) => {
    LogMapper[loggerName][level](message, data);
  });
};

export const logger: Omit<LoggerContract, 'setConfig' | 'cleanUp'> = {
  debug: (message: string, data?: any) => log('debug', message, data),
  info: (message: string, data?: any) => log('info', message, data),
  warn: (message: string, data?: any) => log('warn', message, data),
  error: (message: string, data?: any) => log('error', message, data),
  navigationStack: (message: string, data?: any) => log('navigationStack', message, data),
  networkIO: (message: string, data?: any) => log('networkIO', message, data),
  redux: (message: string, data?: any) => log('redux', message, data),
};

export { setLoggerConfig };

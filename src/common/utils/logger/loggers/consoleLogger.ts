import { LogLevel, ConsoleLoggerConfig } from '../types';

export const consoleLogger = (level: LogLevel, message: string, data?: any, config?: ConsoleLoggerConfig) => {
  switch (level) {
    case LogLevel.INFO:
      console.log(`[INFO] ${message}`, data);
      break;
    case LogLevel.DEBUG:
      console.debug(`[DEBUG] ${message}`, data);
      break;
    case LogLevel.WARN:
      console.warn(`[WARN] ${message}`, data);
      break;
    case LogLevel.ERROR:
      console.error(`[ERROR] ${message}`, data);
      break;
  }
};

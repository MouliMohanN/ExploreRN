import { LogLevel, LogFunction } from '../types';

export const consoleLogger: LogFunction = (level, message, data?) => {
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

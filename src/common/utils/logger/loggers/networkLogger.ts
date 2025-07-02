import { LogLevel, LogFunction } from '../types';

export const networkLogger: LogFunction = (level, message, data?) => {
  // TODO: Implement actual network logging (e.g., sending to a remote logging service)
  // This is a placeholder.
  // console.log(`[NETWORK] ${LogLevel[level]}: ${message}`, ...args);
};

import { ConsoleLoggerConfig } from '../types/types';
import { defaultLogLevelConfig, LoggerContract } from './LoggerContract';

export const defaultConsoleLoggerConfig: ConsoleLoggerConfig = {
  logLevel: { ...defaultLogLevelConfig },
};

let config = defaultConsoleLoggerConfig;

export const ConsoleLogger: LoggerContract = {
  info: (message: string, data?: any) => {
    if (!config?.logLevel?.info) return; // Check if logging is enabled for INFO level
    console.log(`[INFO] ${message}`, data);
  },
  debug: (message: string, data?: any) => {
    if (!config?.logLevel?.debug) return; // Check if logging is enabled for DEBUG level
    console.debug(`[DEBUG] ${message}`, data);
  },

  warn: (message: string, data?: any) => {
    if (!config?.logLevel?.warn) return; // Check if logging is enabled for WARN level
    console.warn(`[WARN] ${message}`, data);
  },
  error: (message: string, data?: any) => {
    if (!config?.logLevel?.error) return; // Check if logging is enabled for ERROR level
    console.error(`[ERROR] ${message}`, data);
  },
  navigationStack: (message: string, data?: any) => {
    if (!config?.logLevel?.navigationStack) return; // Check if logging is enabled for navigation stack
    console.info(`[NAVIGATION] ${message}`, data);
  },
  networkIO: (message: string, data?: any) => {
    if (!config?.logLevel?.networkIO) return; // Check if logging is enabled for network I/O
    console.info(`[NETWORK] ${message}`, data);
  },
  redux: (message: string, data?: any) => {
    if (!config?.logLevel?.redux) return; // Check if logging is enabled for Redux actions
    console.info(`[REDUX] ${message}`, data);
  },

  setConfig: (updatedConfig: ConsoleLoggerConfig) => {
    config = updatedConfig;
  },

  cleanUp: () => {
    // No cleanup needed for console logger
  },
};

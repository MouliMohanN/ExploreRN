import { ConsoleLoggerConfig } from '../types/types';
import { defaultLogLevelConfig, ILogger } from './iLogger';


export const defaultConsoleLoggerConfig: ConsoleLoggerConfig = {
  logLevel: { ...defaultLogLevelConfig },
};


export const ConsoleLogger: ILogger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  debug: (message: string, data?: any) => {
    console.debug(`[DEBUG] ${message}`, data);
  },

  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },
  error: (message: string, data?: any) => {
    console.error(`[ERROR] ${message}`, data);
  },
  navigationStack: (message: string, data?: any) => {
    console.info(`[NAVIGATION] ${message}`, data);
  },
  networkIO: (message: string, data?: any) => {
    console.info(`[NETWORK] ${message}`, data);
  },
  redux: (message: string, data?: any) => {
    console.info(`[REDUX] ${message}`, data);
  },

  setConfig: (updatedConfig: ConsoleLoggerConfig) => { 
  },
};

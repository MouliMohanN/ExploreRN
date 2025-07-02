import { LoggerConfig } from './types';
import defaultConfig from './config';
import { cleanOldLogs } from './logCleaner';

export let currentConfig: LoggerConfig = { ...defaultConfig };

export const setLoggerConfig = (newConfig: Partial<LoggerConfig>) => {
  currentConfig = { ...currentConfig, ...newConfig };
};

import { LoggerConfig } from './types';
import defaultConfig from './config';
import { cleanOldLogs } from './logCleaner';

export let currentConfig: LoggerConfig = { ...defaultConfig };

export const setLoggerConfig = (newConfig: Partial<LoggerConfig>) => {
  currentConfig = { ...currentConfig, ...newConfig };
  // Trigger cleanup after a delay, using configurable delay
  setTimeout(() => {
    cleanOldLogs(currentConfig);
  }, currentConfig.fileConfig?.cleanupDelayMs || 500); // Default to 500ms if not configured
};

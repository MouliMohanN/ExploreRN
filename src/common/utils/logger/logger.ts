import { LogLevel, LoggerConfig, ConsoleLoggerConfig, FileLoggerConfig, NetworkLoggerConfig } from './types';
import { consoleLogger } from './loggers/consoleLogger';
import { fileLogger } from './loggers/fileLogger';
import { networkLogger } from './loggers/networkLogger';
import defaultConfig from './config';
import { getLogFilePaths } from './logFileName';
import RNFS from 'react-native-fs';

let currentConfig: LoggerConfig = { ...defaultConfig };

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

const cleanOldLogs = async () => {
  const retentionHours = currentConfig.fileConfig?.logRetentionHours || 24; // Default to 24 hours if not set
  const cutoffTime = Date.now() - (retentionHours * 60 * 60 * 1000);

  try {
    const logFiles = await getLogFilePaths();
    for (const filePath of logFiles) {
      const fileName = filePath.split('/').pop();
      if (fileName) {
        // Extract timestamp from filename: appName_YYYY-MM-DD_HH-MM-SS.log
        const parts = fileName.split('_');
        if (parts.length === 3) {
          const datePart = parts[1]; // YYYY-MM-DD
          const timePart = parts[2].split('.')[0]; // HH-MM-SS
          const fileTimestamp = new Date(`${datePart}T${timePart}`).getTime();

          if (fileTimestamp < cutoffTime) {
            await RNFS.unlink(filePath);
            console.log(`Deleted old log file: ${fileName}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error cleaning old log files:', error);
  }
};

// Initial cleanup when logger is initialized
cleanOldLogs();

export const logger = {
  debug: (message: string, data?: any) => log(LogLevel.DEBUG, message, data),
  info: (message: string, data?: any) => log(LogLevel.INFO, message, data),
  warn: (message: string, data?: any) => log(LogLevel.WARN, message, data),
  error: (message: string, data?: any) => log(LogLevel.ERROR, message, data),
};

export const setLoggerConfig = (newConfig: Partial<LoggerConfig>) => {
  currentConfig = { ...currentConfig, ...newConfig };
  // Run cleanup after config update, in case retention period changed
  cleanOldLogs();
};
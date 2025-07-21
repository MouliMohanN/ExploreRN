import RNFS from 'react-native-fs';
import app from '../../../../../app.json';
import { FileLoggerConfig, LogLevel } from '../types/types';
import { LoggerContract, defaultLogLevelConfig } from './LoggerContract';

const PrivateUtils = {
  generateLogFileName: () => {
    const appName = app.name;
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const fileName = `${appName}_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.txt`;

    return `${RNFS.DocumentDirectoryPath}/${fileName}`;
  },

  getLogFilePaths: async () => {
    const appName = app.name;
    try {
      const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
      const logFiles = files
        .filter((file) => file.name.startsWith(appName) && file.name.endsWith('.txt'))
        .sort((a, b) => {
          // Sort by modification time (mtime) in descending order (newest first)
          return b.mtime!!.getTime() - a.mtime!!.getTime();
        })
        .map((file) => file.path);
      return logFiles;
    } catch (error) {
      console.error('Failed to read log directory:', error);
      return [];
    }
  },

  cleanOldLogs: async (config: FileLoggerConfig) => {
    const retentionHours = config.logRetentionHours || 24; // Default to 24 hours if not set
    const cutoffTime = Date.now() - retentionHours * 60 * 60 * 1000;

    try {
      const logFiles = await PrivateUtils.getLogFilePaths();
      for (const filePath of logFiles) {
        const fileName = filePath.split('/').pop();
        if (fileName) {
          // Extract timestamp from filename: appName_YYYY-MM-DD_HH-MM-SS.txt
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
  },
};

export const defaultFileLoggerConfig: FileLoggerConfig = {
  logLevel: { ...defaultLogLevelConfig },
  logRetentionHours: 24, // Default to 24 hours
  cleanupDelayMs: 20000, // Default to 20 seconds
  logSeparator: '\n', // Default to newline character
};

let config = defaultFileLoggerConfig;
let logFilePath: string | null = null;

const log = async (level: LogLevel, message: string, data?: any, config?: FileLoggerConfig) => {
  if (!config?.logLevel?.[level]) return; // Check if logging is enabled for this level

  if (!logFilePath) {
    logFilePath = PrivateUtils.generateLogFileName();
  }

  const timestamp = new Date().toISOString();
  const logSeparator = config?.logSeparator || '\n\n';
  const logEntry = `[${timestamp}] [${level}] ${message} ${data ? JSON.stringify(data) : ''}${logSeparator}`;

  try {
    await RNFS.appendFile(logFilePath, logEntry, 'utf8');
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
};

export const getLogFilePaths = async () => {
  return PrivateUtils.getLogFilePaths();
};

export const FileLogger: LoggerContract = {
  info: async (message: string, data?: any) => {
    if (!config?.logLevel?.info) return; // Check if logging is enabled for INFO level
    log('info', message, data);
  },

  debug: async (message: string, data?: any) => {
    if (!config?.logLevel?.debug) return; // Check if logging is enabled for DEBUG level
    log('debug', message, data);
  },

  warn: async (message: string, data?: any) => {
    if (!config?.logLevel?.warn) return; // Check if logging is enabled for WARN level
    log('warn', message, data);
  },

  error: async (message: string, data?: any) => {
    if (!config?.logLevel?.error) return; // Check if logging is enabled for ERROR level
    log('error', message, data);
  },

  navigationStack: async (message: string, data?: any) => {
    if (!config?.logLevel?.navigationStack) return; // Check if logging is enabled for navigation stack
    log('navigationStack', message, data);
  },

  networkIO: async (message: string, data?: any) => {
    if (!config?.logLevel?.networkIO) return; // Check if logging is enabled for network I/O
    log('networkIO', message, data);
  },

  redux: async (message: string, data?: any) => {
    if (!config?.logLevel?.redux) return; // Check if logging is enabled for Redux actions
    log('redux', message, data);
  },

  setConfig: (updatedConfig: FileLoggerConfig) => {
    config = updatedConfig;
  },

  cleanUp: () => {
    setTimeout(() => {
      PrivateUtils.cleanOldLogs(config);
    }, config.cleanupDelayMs || 20000); // Default to 20 seconds if not configured
  },
};

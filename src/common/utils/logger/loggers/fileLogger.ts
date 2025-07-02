import { LogLevel, FileLoggerConfig } from '../types';
import RNFS from 'react-native-fs';
import { generateLogFileName } from '../logFileName';

const logFilePath = generateLogFileName();

export const fileLogger = async (level: LogLevel, message: string, data?: any, config?: FileLoggerConfig) => {
  const timestamp = new Date().toISOString();
  const logSeparator = config?.logSeparator || '\n\n';
  const logEntry = `[${timestamp}] [${LogLevel[level]}] ${message} ${data ? JSON.stringify(data) : ''}${logSeparator}`;

  try {
    await RNFS.appendFile(logFilePath, logEntry, 'utf8');
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
};
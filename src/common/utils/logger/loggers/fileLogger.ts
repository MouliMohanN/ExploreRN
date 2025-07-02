import { LogLevel, LogFunction } from '../types';
import RNFS from 'react-native-fs';
import getLogFileName from '../logFileName';

const logFilePath = getLogFileName();

export const fileLogger: LogFunction = async (level, message, data?) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${LogLevel[level]}] ${message} ${data ? JSON.stringify(data) : ''}\n`;

  try {
    await RNFS.appendFile(logFilePath, logEntry, 'utf8');
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
};
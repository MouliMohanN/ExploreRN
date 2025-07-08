import RNFS from 'react-native-fs';
import { getLogFilePaths } from './logFileName';
import { LoggerConfig } from '../types';

export const cleanOldLogs = async (config: LoggerConfig) => {
  const retentionHours = config.fileConfig?.logRetentionHours || 24; // Default to 24 hours if not set
  const cutoffTime = Date.now() - (retentionHours * 60 * 60 * 1000);

  try {
    const logFiles = await getLogFilePaths();
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
};

import RNFS from 'react-native-fs';
import app from '../../../../app.json';

export const generateLogFileName = () => {
  const appName = app.name;
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const fileName = `${appName}_${year}${month}${day}_${hours}${minutes}${seconds}.log`;

  return `${RNFS.DocumentDirectoryPath}/${fileName}`;
};

export const getLogFilePaths = async () => {
  const appName = app.name;
  try {
    const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
    const logFiles = files.filter(file => file.name.startsWith(appName) && file.name.endsWith('.log'))
                          .map(file => file.path);
    return logFiles;
  } catch (error) {
    console.error('Failed to read log directory:', error);
    return [];
  }
};
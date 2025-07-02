import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import app from '../../../app.json';

const getLogFileName = () => {
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

export default getLogFileName;

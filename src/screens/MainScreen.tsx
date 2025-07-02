import {Text, View} from 'react-native';
import { Button } from '../common/components/Button';
import { logger } from '../common/utils/logger/logger';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../navigation';

export const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', padding: 16}}>
      <Text>Main Screen</Text>
      <Button title='Log Info' onPress={() => {
        logger.info('Log Info button pressed', { exampleData: 'This is some data' });
       }} />
      <Button title='View Logs' onPress={() => {
        navigation.navigate(ScreenNames.LogViewer);
      }} />
    </View>
  );
};

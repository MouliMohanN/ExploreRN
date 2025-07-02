import {Text, View} from 'react-native';
import { Button } from '../common/components/Button';
import { logger } from '../common/utils/logger/logger';

export const MainScreen = () => {

  return (
    <View style={{flex: 1, alignItems: 'center', padding: 16}}>
      <Text>Main Screen</Text>
      <Button title='Go to screen' onPress={() => {
        logger.info('Button pressed');
       }} />
    </View>
  );
};

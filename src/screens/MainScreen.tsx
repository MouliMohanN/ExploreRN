import {Text, View} from 'react-native';
import { Button } from '../common/components/Button';

export const MainScreen = () => {

  return (
    <View style={{flex: 1, alignItems: 'center', padding: 16}}>
      <Text>Main Screen</Text>
      <Button title='Go to screen' onPress={() => { }} />
    </View>
  );
};

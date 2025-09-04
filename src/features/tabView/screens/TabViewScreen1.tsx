import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { CounterContext } from '../CounterContext';

export const TabViewScreen1: React.FC<any> = () => {
  const { count, setCount } = useContext(CounterContext);
  return (
    <View>
      <Text>TabViewScreen1</Text>
      <Text>Count: {count}</Text>
      <Button title='Increment' onPress={() => setCount(count + 1)} />
    </View>
  );
};

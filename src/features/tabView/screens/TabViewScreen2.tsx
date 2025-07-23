import React from 'react';
import { Button, Text, View } from 'react-native';

export const TabViewScreen2: React.FC<any> = ({ count, setCount }) => {
  return (
    <View>
      <Text>TabViewScreen2</Text>
      <Text>Count: {count}</Text>
      <Button title='Increment' onPress={() => setCount(count + 1)} />
    </View>
  );
};

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const App = () => {
  console.log('App component rendered');
  return (
    <View>
      <Text>Hello, world!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

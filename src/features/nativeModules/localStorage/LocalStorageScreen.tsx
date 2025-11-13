import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import NativeLocalStorage from 'react-native-local-storage';
import { ScreenConfig } from '../../../common/navigation/conventions';

const EMPTY = '<empty>';

export default function LocalStorageScreen(): React.ReactElement {
  const [value, setValue] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string | null>(null);

  useEffect(() => {
    const storedValue = NativeLocalStorage?.getItem('myKey');
    setValue(storedValue ?? '');
  }, []);

  function saveValue() {
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
    NativeLocalStorage?.removeItem('myKey');
    setValue('');
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>LocalStorage Demo</Text>
        <Text style={styles.text}>Current stored value is: {value ?? 'No Value'}</Text>
        <TextInput
          placeholder='Enter the text you want to store'
          style={styles.textInput}
          onChangeText={setEditingValue}
          value={editingValue ?? ''}
        />
        <View style={styles.buttonContainer}>
          <Button title='Save' onPress={saveValue} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title='Delete' onPress={deleteValue} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title='Clear All' onPress={clearAll} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    margin: 10,
  },
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'LocalStorage',
  component: LocalStorageScreen,
  options: {
    headerShown: true,
    title: 'LocalStorage Screen',
  },
};

import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createNitroLocalStorage, type NitroLocalStorageHybrid } from 'react-native-nitro-local-storage';
import { ScreenConfig } from '../../../common/navigation/conventions';

const STORAGE_KEY = 'myKey';
const EMPTY = '<empty>';

export default function NitroLocalStorageScreen(): React.ReactElement {
  const [storage, setStorage] = useState<NitroLocalStorageHybrid | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const instance = createNitroLocalStorage();
      setStorage(instance);

      const stored = instance.getItem(STORAGE_KEY);
      setValue(stored);
      setEditingValue(stored ?? '');
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setInitError(message);
    }
  }, []);

  function saveValue() {
    if (!storage) {
      return;
    }

    const nextValue = editingValue.length > 0 ? editingValue : EMPTY;
    storage.setItem(nextValue, STORAGE_KEY);
    setValue(nextValue);
  }

  function deleteValue() {
    if (!storage) {
      return;
    }

    storage.removeItem(STORAGE_KEY);
    setValue(null);
    setEditingValue('');
  }

  function clearAll() {
    if (!storage) {
      return;
    }

    storage.clear();
    setValue(null);
    setEditingValue('');
  }

  function refreshValue() {
    if (!storage) {
      return;
    }

    const stored = storage.getItem(STORAGE_KEY);
    setValue(stored);
    setEditingValue(stored ?? '');
  }

  const isReady = storage != null && initError == null;

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior='automatic'>
      <View style={styles.content}>
        <Text style={styles.title}>Nitro LocalStorage Demo</Text>
        <Text style={styles.subtitle}>
          Interact with the Nitro HybridObject and observe how it shares the same persistent store as the TurboModule.
        </Text>
        {initError ?
          <Text style={styles.error}>Nitro runtime failed to load: {initError}</Text>
        : <>
            <Text style={styles.text}>Current stored value: {value ?? 'No Value'}</Text>
            <TextInput
              placeholder='Enter the value to persist'
              style={styles.textInput}
              onChangeText={setEditingValue}
              value={editingValue}
              editable={isReady}
              autoCapitalize='none'
            />
            <View style={styles.buttonContainer}>
              <Button title='Save' onPress={saveValue} disabled={!isReady} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title='Delete Key' onPress={deleteValue} disabled={!isReady} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title='Clear All' onPress={clearAll} disabled={!isReady} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title='Refresh Value' onPress={refreshValue} disabled={!isReady} />
            </View>
          </>
        }
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
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 20,
    fontSize: 14,
    color: '#555',
  },
  text: {
    marginBottom: 12,
    fontSize: 18,
  },
  textInput: {
    height: 44,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  buttonContainer: {
    marginVertical: 6,
  },
  error: {
    color: '#b00020',
    fontSize: 16,
  },
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'NitroLocalStorage',
  component: NitroLocalStorageScreen,
  options: {
    headerShown: true,
    title: 'NitroLocalStorage Demo',
  },
};

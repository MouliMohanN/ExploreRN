import React, { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export type FancyInputHandle = { focus: () => void; clear: () => void };

// React 19 allows passing `ref` as a regular prop too, but forwardRef remains best for TS
const FancyInput = forwardRef<FancyInputHandle, { label: string }>((props, ref) => {
  const inputRef = useRef<TextInput>(null);
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => inputRef.current?.clear(),
  }));
  const id = useId();
  return (
    <View style={styles.inputCard}>
      <Text nativeID={`${id}-label`} style={styles.label}>
        {props.label}
      </Text>
      <TextInput ref={inputRef} nativeID={id} style={styles.input} placeholder='Type here' />
    </View>
  );
});

export default function RefImprovementsExample(): React.ReactElement {
  const fancyRef = useRef<FancyInputHandle>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ref improvements</Text>
      <Text style={styles.subtitle}>Forward refs + useId; call methods from parent</Text>

      <FancyInput ref={fancyRef} label='Your message' />

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
        <TouchableOpacity style={styles.button} onPress={() => fancyRef.current?.focus()}>
          <Text style={styles.buttonText}>Focus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => fancyRef.current?.clear()}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { color: '#6b7280', marginBottom: 8 },
  inputCard: { backgroundColor: 'white', padding: 12, borderRadius: 10 },
  label: { marginBottom: 6, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10 },
  button: { backgroundColor: '#111827', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: '700' },
});

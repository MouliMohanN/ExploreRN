import React, { useActionState, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Simple async action that simulates a server call
async function saveProfile(prev: { message?: string; error?: string } | null, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  await new Promise(r => setTimeout(r, 1200));
  if (!name || !email) return { error: 'Name and email are required' };
  if (!/\S+@\S+\.\S+/.test(email)) return { error: 'Invalid email format' };
  // random failure
  if (Math.random() < 0.12) return { error: 'Network error. Try again.' };
  return { message: `Saved for ${name}` };
}

export default function UseActionStateExample(): React.ReactElement {
  const [inputs, setInputs] = useState({ name: '', email: '' });
  const [state, submit, pending] = useActionState(saveProfile, null);

  const onSubmit = () => {
    const fd = new FormData();
    fd.append('name', inputs.name);
    fd.append('email', inputs.email);
    submit(fd);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>useActionState</Text>
      <Text style={styles.subtitle}>Manage async actions with built-in pending and result state</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Name"
          value={inputs.name}
          onChangeText={(t) => setInputs(p => ({ ...p, name: t }))}
          style={styles.input}
          editable={!pending}
        />
        <TextInput
          placeholder="Email"
          value={inputs.email}
          onChangeText={(t) => setInputs(p => ({ ...p, email: t }))}
          style={styles.input}
          editable={!pending}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TouchableOpacity disabled={pending} onPress={onSubmit} style={[styles.button, pending && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>{pending ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
        {state?.message ? <Text style={styles.success}>✅ {state.message}</Text> : null}
        {state?.error ? <Text style={styles.error}>❌ {state.error}</Text> : null}
      </View>

      <View style={styles.hint}>
        <Text style={styles.hintText}>Tip: You don't need useState/useEffect boilerplate for async submit anymore.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 6 },
  subtitle: { color: '#6b7280', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, gap: 10, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12, fontSize: 16 },
  button: { backgroundColor: '#007AFF', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#9ca3af' },
  buttonText: { color: 'white', fontWeight: '600' },
  success: { color: '#065f46', marginTop: 8, fontWeight: '600' },
  error: { color: '#b91c1c', marginTop: 8, fontWeight: '600' },
  hint: { marginTop: 14 },
  hintText: { color: '#6b7280', fontStyle: 'italic' },
});

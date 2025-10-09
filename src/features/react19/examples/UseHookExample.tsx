import React, { createContext, Suspense, use, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ThemeContext = createContext({ primary: '#007AFF', text: '#111827', bg: 'white' });

async function fetchUser(id: number) {
  await new Promise((r) => setTimeout(r, 1000));
  return { id, name: `User ${id}`, email: `user${id}@example.com` };
}

function Profile({ resource }: { resource: Promise<{ id: number; name: string; email: string }> }) {
  const user = use(resource);
  const theme = use(ThemeContext);
  return (
    <View style={[styles.card, { borderLeftColor: theme.primary }]}>
      <Text style={[styles.name, { color: theme.primary }]}>{user.name}</Text>
      <Text style={{ color: theme.text }}>{user.email}</Text>
    </View>
  );
}

export default function UseHookExample(): React.ReactElement {
  const [id, setId] = useState(1);
  const [res, setRes] = useState<Promise<{ id: number; name: string; email: string }>>(() => fetchUser(1));

  const load = (next: number) => {
    setId(next);
    setRes(fetchUser(next));
  };

  return (
    <ThemeContext.Provider value={{ primary: '#7c3aed', text: '#111827', bg: 'white' }}>
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>use(resource)</Text>
        <Text style={styles.subtitle}>Consume promises and context directly</Text>

        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
          {[1, 2, 3].map((n) => (
            <TouchableOpacity key={n} onPress={() => load(n)} style={[styles.button, id === n && styles.buttonActive]}>
              <Text style={styles.buttonText}>User {n}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Suspense
          fallback={
            <View style={styles.loading}>
              <ActivityIndicator color='#7c3aed' />
              <Text style={{ marginTop: 8 }}>Loading...</Text>
            </View>
          }
        >
          <Profile resource={res} />
        </Suspense>
      </ScrollView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#6b7280', marginBottom: 12 },
  button: { backgroundColor: '#e0e7ff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  buttonActive: { backgroundColor: '#c7d2fe' },
  buttonText: { color: '#3730a3', fontWeight: '700' },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 16, borderLeftWidth: 4 },
  name: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  loading: { backgroundColor: 'white', padding: 16, borderRadius: 12, alignItems: 'center' },
});

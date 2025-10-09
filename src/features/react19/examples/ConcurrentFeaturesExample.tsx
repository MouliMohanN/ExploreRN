import React, { useDeferredValue, useState, useTransition } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

function makeItems(n: number) {
  return Array.from({ length: n }, (_, i) => ({ id: i, label: `Item ${i + 1}`, note: `Details for item ${i + 1}` }));
}

function expensiveFilter(items: { id: number; label: string; note: string }[], q: string) {
  if (!q) return items;
  const start = performance.now();
  while (performance.now() - start < 30) {}
  return items.filter(
    (x) => x.label.toLowerCase().includes(q.toLowerCase()) || x.note.toLowerCase().includes(q.toLowerCase()),
  );
}

export default function ConcurrentFeaturesExample(): React.ReactElement {
  const [items] = useState(() => makeItems(800));
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(items);
  const [pending, startTransition] = useTransition();
  const deferred = useDeferredValue(query);

  React.useEffect(() => {
    startTransition(() => {
      setFiltered(expensiveFilter(items, deferred));
    });
  }, [deferred, items, startTransition]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Concurrent features</Text>
      <Text style={styles.subtitle}>useTransition + useDeferredValue for smooth filtering</Text>

      <TextInput value={query} onChangeText={setQuery} placeholder='Type to filter...' style={styles.input} />
      {pending ?
        <Text style={styles.pending}>Updating list...</Text>
      : null}

      <FlatList
        data={filtered}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowTitle}>{item.label}</Text>
            <Text style={styles.rowNote}>{item.note}</Text>
          </View>
        )}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews
        contentContainerStyle={{ paddingBottom: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { color: '#6b7280', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 10, marginBottom: 8 },
  pending: { color: '#2563eb', marginBottom: 8 },
  row: { backgroundColor: 'white', padding: 12, borderRadius: 10, marginBottom: 8 },
  rowTitle: { fontWeight: '700', marginBottom: 4 },
  rowNote: { color: '#6b7280' },
});

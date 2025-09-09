import React, { useOptimistic, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

async function apiToggleLike(id: number, liked: boolean) {
  await new Promise(r => setTimeout(r, 800));
  if (Math.random() < 0.1) throw new Error('Network error');
  return !liked;
}

export default function UseOptimisticExample(): React.ReactElement {
  const [items, setItems] = useState(() => (
    Array.from({ length: 8 }, (_, i) => ({ id: i + 1, liked: Math.random() > 0.5, text: `Post #${i + 1}` }))
  ));

  const renderItem = ({ item }: { item: { id: number; liked: boolean; text: string } }) => (
    <OptimisticRow
      item={item}
      onCommit={(val) => setItems(prev => prev.map(p => p.id === item.id ? { ...p, liked: val } : p))}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>useOptimistic</Text>
      <Text style={styles.subtitle}>Instant UI updates, auto-rollback on failure</Text>
      <FlatList
        data={items}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}

function OptimisticRow({ item, onCommit }: { item: { id: number; liked: boolean; text: string }; onCommit: (val: boolean) => void }) {
  const [optimistic, addOptimistic] = useOptimistic(item, (cur, nextLiked: boolean) => ({ ...cur, liked: nextLiked }));

  const toggle = async () => {
    const next = !optimistic.liked;
    addOptimistic(next); // instant UI change
    try {
      const confirmed = await apiToggleLike(item.id, item.liked);
      onCommit(confirmed);
    } catch (e) {
      // rollback handled by useOptimistic (state reverts to source on next render)
    }
  };

  return (
    <View style={styles.row}>
      <Text style={styles.rowText}>{item.text}</Text>
      <TouchableOpacity style={[styles.likeBtn, optimistic.liked ? styles.liked : styles.unliked]} onPress={toggle}>
        <Text style={[styles.likeText, optimistic.liked ? styles.likedText : styles.unlikedText]}>
          {optimistic.liked ? '♥ Liked' : '♡ Like'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginTop: 8, marginHorizontal: 12 },
  subtitle: { color: '#6b7280', marginHorizontal: 12, marginBottom: 8 },
  row: { backgroundColor: 'white', marginHorizontal: 12, padding: 14, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowText: { fontSize: 16 },
  likeBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1 },
  liked: { backgroundColor: '#fee2e2', borderColor: '#fecaca' },
  unliked: { backgroundColor: '#eff6ff', borderColor: '#dbeafe' },
  likeText: { fontWeight: '700' },
  likedText: { color: '#b91c1c' },
  unlikedText: { color: '#1d4ed8' },
});

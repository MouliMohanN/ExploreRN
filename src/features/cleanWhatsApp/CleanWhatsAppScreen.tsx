import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../common/components/Button';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';
import storage from '../../common/utils/storage';

type Item = {
  id: string;
  text: string;
};

export default function CleanWhatsAppScreen({}: ScreenBaseProps): React.ReactElement {
  const [text, setText] = useState('');
  const [items, setItems] = useState<Item[]>(() => {
    // start with an empty list; heavy lists can be added later
    return [];
  });
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  const inputRef = useRef<TextInput | null>(null);
  const STORAGE_KEY = 'clean_whatsapp_items_v1';

  // load saved items on mount
  useEffect(() => {
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: Item[] = JSON.parse(raw);
      if (Array.isArray(parsed)) setItems(parsed);
    } catch (e) {
      console.warn('Failed to load saved items', e);
    }
  }, []);

  // persist items when they change
  useEffect(() => {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save items', e);
    }
  }, [items]);

  const addItem = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newItem: Item = { id: String(Date.now()) + Math.random().toString(36).slice(2), text: trimmed };
    setItems((prev) => [newItem, ...prev]);
    setText('');
    inputRef.current?.blur();
    Keyboard.dismiss();
  }, [text]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }, []);

  const deleteItem = useCallback((id: string) => {
    Alert.alert('Delete', 'Delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setItems((prev) => prev.filter((i) => i.id !== id)),
      },
    ]);
  }, []);

  const deleteSelected = useCallback(() => {
    const ids = Object.keys(selectedIds);
    if (!ids.length) return;
    Alert.alert('Delete selected', `Delete ${ids.length} item(s)?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setItems((prev) => prev.filter((i) => !selectedIds[i.id]));
          setSelectedIds({});
          setSelectionMode(false);
        },
      },
    ]);
  }, [selectedIds]);

  const clearAll = useCallback(() => {
    if (!items.length) return;
    Alert.alert('Clear all', `Delete all ${items.length} item(s)?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setItems([]) },
    ]);
  }, [items.length]);

  const performCleanUp = useCallback(() => {
    if (!items.length) {
      Alert.alert('Clean Up', 'No items to clean.');
      return;
    }
  }, [items]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Item>) => {
      const selected = !!selectedIds[item.id];
      return (
        <View style={[styles.row, selected && styles.rowSelected]}>
          <TouchableOpacity
            onPress={() => (selectionMode ? toggleSelection(item.id) : undefined)}
            onLongPress={() => {
              setSelectionMode(true);
              toggleSelection(item.id);
            }}
            activeOpacity={0.8}
            style={styles.rowContent}
          >
            {selectionMode ?
              <View style={[styles.checkbox, selected && styles.checkboxActive]}>
                {selected && <View style={styles.checkboxInner} />}
              </View>
            : <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.text.charAt(0).toUpperCase()}</Text>
              </View>
            }

            <View style={styles.textContainer}>
              <Text style={styles.rowText} numberOfLines={1} ellipsizeMode='tail'>
                {item.text}
              </Text>
              <Text style={styles.rowSubText}>Tap to open · Long press to select</Text>
            </View>
          </TouchableOpacity>

          {!selectionMode && (
            <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteBtn}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    },
    [selectedIds, selectionMode, toggleSelection, deleteItem],
  );

  const keyExtractor = useCallback((item: Item) => item.id, []);

  const selectedCount = useMemo(() => Object.keys(selectedIds).length, [selectedIds]);

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder='Type text and press Add'
          value={text}
          onChangeText={setText}
          onSubmitEditing={addItem}
          returnKeyType='done'
        />
        <Button title='Add' onPress={addItem} disabled={!text.trim()} style={styles.addBtn} />
      </View>
      <Button title='Perform Clean Up' onPress={performCleanUp} style={[styles.actionBtn, styles.cleanBtn]} />
      <View style={styles.actionsRow}>
        <Button
          title={selectionMode ? `Exit (${selectedCount})` : 'Select'}
          onPress={() => {
            if (selectionMode) {
              setSelectionMode(false);
              setSelectedIds({});
            } else {
              setSelectionMode(true);
            }
          }}
          style={[styles.actionBtn, selectionMode && styles.actionBtnActive]}
        />
        <Button
          title='Delete Selected'
          accessibilityLabel='Delete selected items'
          onPress={deleteSelected}
          disabled={!selectedCount}
          style={[styles.actionBtn, !selectedCount && styles.actionBtnDisabled]}
        />

        <Button title='Clear All' onPress={clearAll} style={styles.actionBtn} />
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps='handled'
        windowSize={21}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        removeClippedSubviews={true}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  inputRow: { flexDirection: 'row', marginBottom: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6 },
  addBtn: {
    marginLeft: 8,
    borderRadius: 6,
    justifyContent: 'center',
  },
  addText: { color: '#fff', fontWeight: '600' },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  actionBtn: { borderRadius: 6 },
  actionBtnActive: {
    /* intentionally blank to avoid background color */
  },
  actionBtnDisabled: { opacity: 0.5 },
  actionText: { fontSize: 14 },
  listContainer: { paddingBottom: 120 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  rowContent: { flex: 1, paddingRight: 8, flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e6f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: { fontWeight: '700', color: '#0366d6' },
  textContainer: { flex: 1, justifyContent: 'center' },
  rowText: { fontSize: 16, fontWeight: '500', color: '#111' },
  rowSubText: { fontSize: 12, color: '#666', marginTop: 2 },
  rowSelected: { backgroundColor: '#f0f8ff' },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: { borderColor: '#0a84ff' },
  checkboxInner: { width: 12, height: 12, backgroundColor: '#0a84ff', borderRadius: 2 },
  deleteBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  deleteText: { color: '#d00', fontWeight: '600' },
  cleanBtn: { marginHorizontal: 8 },
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'CleanWhatsApp',
  component: CleanWhatsAppScreen,
  options: {
    headerShown: true,
    title: 'CleanWhatsApp Screen',
  },
};

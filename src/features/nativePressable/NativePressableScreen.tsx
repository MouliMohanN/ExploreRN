import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativePressable } from '../../common/components/NativePressable';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

export default function NativePressableScreen({}: ScreenBaseProps): React.ReactElement {
  const handlePress = (message: string) => {
    console.log(message);
    // Alert.alert('Pressed', message); // Using console log to avoid blocking UI during dev
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>NativePressable Examples</Text>

      <Text style={styles.sectionTitle}>1. Standard Buttons</Text>
      <View style={styles.row}>
        <NativePressable style={styles.primaryButton} onPress={() => handlePress('Primary Button')}>
          <Text style={styles.primaryButtonText}>Primary Action</Text>
        </NativePressable>

        <NativePressable style={styles.secondaryButton} onPress={() => handlePress('Secondary Button')}>
          <Text style={styles.secondaryButtonText}>Secondary</Text>
        </NativePressable>
      </View>

      <Text style={styles.sectionTitle}>2. Card Items (Pressable Areas)</Text>
      <NativePressable style={styles.card} onPress={() => handlePress('Card 1 Pressed')}>
        <Text style={styles.cardTitle}>Interactive Card</Text>
        <Text style={styles.cardContent}>
          This entire card area is pressable. Notice the ripple effect responding to touch coordinates.
        </Text>
      </NativePressable>

      <NativePressable style={[styles.card, styles.cardAccent]} onPress={() => handlePress('Card 2 Pressed')}>
        <Text style={styles.cardTitle}>Accented Card</Text>
        <Text style={styles.cardContent}>Another example with a different background color.</Text>
      </NativePressable>

      <Text style={styles.sectionTitle}>3. List Items</Text>
      <View style={styles.listContainer}>
        {[1, 2, 3].map((item) => (
          <NativePressable key={item} style={styles.listItem} onPress={() => handlePress(`List Item ${item}`)}>
            <Text style={styles.listItemText}>List Option {item}</Text>
            <Text style={styles.chevron}>{'>'}</Text>
          </NativePressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>4. Icon/Circular Buttons</Text>
      <View style={styles.row}>
        <NativePressable style={styles.fab} onPress={() => handlePress('FAB Pressed')}>
          <Text style={styles.fabText}>+</Text>
        </NativePressable>

        <NativePressable
          style={[styles.fab, { backgroundColor: '#FF5252' }]}
          onPress={() => handlePress('Delete FAB Pressed')}
        >
          <Text style={styles.fabText}>×</Text>
        </NativePressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    paddingBottom: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 2,
    overflow: 'hidden', // Important for ripple to respect border radius
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 25,
    overflow: 'hidden',
  },
  secondaryButtonText: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 1,
    overflow: 'hidden',
  },
  cardAccent: {
    backgroundColor: '#E3F2FD',
    borderColor: '#BBDEFB',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardContent: {
    color: '#666',
    lineHeight: 20,
  },
  listContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  listItem: {
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listItemText: {
    fontSize: 16,
  },
  chevron: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#03DAC6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    overflow: 'hidden',
  },
  fabText: {
    fontSize: 24,
    color: 'white',
    lineHeight: 28, // Fix vertical alignment
  },
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'NativePressable',
  component: NativePressableScreen,
  options: {
    headerShown: true,
    title: 'Native Pressable Examples',
  },
};

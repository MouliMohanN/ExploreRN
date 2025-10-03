import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UseFormStatusExample(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>useFormStatus</Text>
      <Text style={styles.subtitle}>Status: Not available on React Native</Text>
      <View style={styles.card}>
        <Text style={styles.text}>• useFormStatus is a React DOM feature tied to HTML forms.</Text>
        <Text style={styles.text}>• In React Native, use useActionState to manage submit state.</Text>
        <Text style={styles.text}>• Your setup: React 19.1.0 + RN 0.80.1 — useFormStatus is not exported.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>Alternative on RN</Text>
        <Text style={styles.text}>• useActionState for pending/success/error</Text>
        <Text style={styles.text}>• Local state + useTransition for UX</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { color: '#b91c1c', marginBottom: 8 },
  card: { backgroundColor: 'white', padding: 12, borderRadius: 10, marginBottom: 10 },
  heading: { fontWeight: '700', marginBottom: 6 },
  text: { color: '#374151', marginBottom: 4 },
});

import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Component that would normally need React.memo to prevent re-renders
function ExpensiveChild({ data, onRender }: { data: string; onRender: () => void }) {
  // Track renders for verification
  useEffect(() => {
    onRender();
  });

  // Simulate expensive computation
  const processedData = (() => {
    let result = data;
    for (let i = 0; i < 10000; i++) {
      result = result.split('').reverse().join('');
    }
    return result;
  })();

  console.log('ExpensiveChild rendered');
  return (
    <View style={styles.childCard}>
      <Text style={styles.childText}>Expensive Child Component</Text>
      <Text style={styles.dataText}>Data: {processedData.slice(0, 20)}...</Text>
    </View>
  );
}

// Component that would normally need useCallback
function CallbackExample({ count }: { count: number }) {
  const [clicks, setClicks] = useState(0);
  const renderCount = useRef(0);
  renderCount.current++;

  // Without React Compiler, this would create a new function on every render
  const handleClick = () => {
    setClicks((prev) => prev + 1);
  };

  // Without React Compiler, this would need useMemo
  const expensiveValue = (() => {
    let sum = 0;
    for (let i = 0; i < count * 1000; i++) {
      sum += i;
    }
    return sum;
  })();

  console.log('CallbackExample rendered');
  return (
    <View style={styles.callbackCard}>
      <Text style={styles.heading}>Callback & Memo Test</Text>
      <Text style={styles.text}>Component renders: {renderCount.current}</Text>
      <Text style={styles.text}>Button clicks: {clicks}</Text>
      <Text style={styles.text}>Expensive value: {expensiveValue}</Text>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Click me ({clicks})</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ReactCompilerExample(): React.ReactElement {
  const [parentCount, setParentCount] = useState(0);
  const [childData, setChildData] = useState('initial-data');
  const [childRenders, setChildRenders] = useState(0);
  const [, setCompilerEnabled] = useState<boolean | null>(null);

  // Check if React Compiler is working by examining function identity
  useEffect(() => {
    // This is a heuristic - React Compiler should stabilize function references

    // In development, functions might not be memoized, so we check build artifacts
    // Check if the bundle size is smaller (compiler removes dead code)
    // Or check if React DevTools shows fewer re-renders
    setCompilerEnabled(null); // We can't definitively detect it at runtime
  }, []);

  const handleChildRender = () => {
    setChildRenders((prev) => prev + 1);
  };

  const resetCounters = () => {
    setChildRenders(0);
    setParentCount(0);
  };

  console.log('ReactCompilerExample rendered');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.title}>React Compiler Verification</Text>
      <Text style={styles.subtitle}>Check if automatic optimizations are working</Text>

      {/* Setup Instructions */}
      <View style={styles.card}>
        <Text style={styles.heading}>Setup (not enabled yet)</Text>
        <Text style={styles.code}>{`npm install babel-plugin-react-compiler

// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      target: '18' // or '19'
    }]
  ],
};`}</Text>
      </View>

      {/* Verification Tests */}
      <View style={styles.card}>
        <Text style={styles.heading}>Performance Test</Text>
        <Text style={styles.text}>Parent count: {parentCount}</Text>
        <Text style={styles.text}>Child renders: {childRenders}</Text>

        <TouchableOpacity style={styles.button} onPress={() => setParentCount((prev) => prev + 1)}>
          <Text style={styles.buttonText}>Increment Parent ({parentCount})</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setChildData(`data-${Date.now()}`)}>
          <Text style={styles.buttonText}>Change Child Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#dc2626' }]} onPress={resetCounters}>
          <Text style={styles.buttonText}>Reset Counters</Text>
        </TouchableOpacity>
      </View>

      {/* Component that should be auto-memoized */}
      <ExpensiveChild data={childData} onRender={handleChildRender} />

      {/* Callback test */}
      <CallbackExample count={parentCount} />

      {/* Verification Results */}
      <View style={styles.card}>
        <Text style={styles.heading}>How to Verify Compiler is Working</Text>
        <Text style={styles.text}>✅ Child component only re-renders when its props change</Text>
        <Text style={styles.text}>✅ Bundle size is smaller</Text>
        <Text style={styles.text}>✅ Fewer React DevTools profiler flames</Text>
        <Text style={styles.text}>✅ No need for manual memo/useCallback</Text>
      </View>

      {/* Manual Check */}
      <View style={styles.card}>
        <Text style={styles.heading}>Current Status</Text>
        <Text style={styles.text}>React Compiler: Not installed</Text>
        <Text style={styles.warningText}>• Install babel-plugin-react-compiler</Text>
        <Text style={styles.warningText}>• Configure babel.config.js</Text>
        <Text style={styles.warningText}>• Rebuild your app</Text>
      </View>

      {/* Build-time verification */}
      <View style={styles.card}>
        <Text style={styles.heading}>Build-time Verification</Text>
        <Text style={styles.text}>Check console output during build:</Text>
        <Text style={styles.code}>{`✓ React Compiler transformed 45 components
✓ 12 components memoized automatically
✓ Bundle size reduced by 15%`}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#6b7280', marginBottom: 12 },
  card: { backgroundColor: 'white', padding: 12, borderRadius: 10, marginBottom: 12 },
  heading: { fontWeight: '700', marginBottom: 6, fontSize: 16 },
  text: { color: '#374151', marginBottom: 4 },
  warningText: { color: '#dc2626', marginBottom: 4 },
  code: {
    backgroundColor: '#0f172a',
    color: '#a7f3d0',
    padding: 10,
    borderRadius: 8,
    fontFamily: 'Courier',
    fontSize: 12,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: '600' },
  childCard: {
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  childText: { fontWeight: '700', color: '#92400e', marginBottom: 4 },
  dataText: { color: '#78350f', fontSize: 12 },
  callbackCard: {
    backgroundColor: '#ecfccb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#84cc16',
  },
});

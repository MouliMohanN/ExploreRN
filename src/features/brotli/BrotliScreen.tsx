import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

interface TestResult {
  url: string;
  method: string;
  success: boolean;
  responseSize?: number;
  responseTime?: number;
  contentEncoding?: string;
  error?: string;
}

export default function BrotliScreen({}: ScreenBaseProps): React.ReactElement {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const runTests = async () => {
    setLoading(true);
    setTestResults([]);

    const testUrls = [
      {
        url: 'https://httpbin.org/json',
        method: 'GET',
        description: 'JSON API (httpbin.org)',
      },
      {
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'GET',
        description: 'JSON Placeholder API',
      },
      {
        url: 'https://httpbin.org/gzip',
        method: 'GET',
        description: 'Gzip compressed endpoint',
      },
      {
        url: 'https://httpbin.org/user-agent',
        method: 'GET',
        description: 'User Agent endpoint',
      },
    ];

    const results: TestResult[] = [];

    for (const test of testUrls) {
      try {
        const startTime = Date.now();

        const response = await fetch(test.url, {
          method: test.method,
          headers: {
            Accept: 'application/json',
            'Accept-Encoding': 'br, gzip, deflate',
          },
        });

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        const text = await response.text();
        const responseSize = text.length;
        const contentEncoding = response.headers.get('content-encoding') || 'none';

        results.push({
          url: test.url,
          method: test.method,
          success: response.ok,
          responseSize,
          responseTime,
          contentEncoding,
        });
      } catch (error) {
        results.push({
          url: test.url,
          method: test.method,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    setTestResults(results);
    setLoading(false);
  };

  return (
    <View>
      <Text>Brotli</Text>

      {testResults.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Results</Text>
          {testResults.map((result, index) => (
            <View key={index} style={styles.testResult}>
              <Text style={styles.testUrl}>{result.url}</Text>
              <View style={styles.testDetails}>
                <Text style={[styles.testStatus, { color: result.success ? '#4CAF50' : '#F44336' }]}>
                  {result.success ? '✓ Success' : '✗ Failed'}
                </Text>
                {result.success && (
                  <>
                    <Text style={styles.testDetail}>Size: {result.responseSize} bytes</Text>
                    <Text style={styles.testDetail}>Time: {result.responseTime}ms</Text>
                    <Text style={styles.testDetail}>Encoding: {result.contentEncoding}</Text>
                  </>
                )}
                {result.error && <Text style={styles.errorText}>Error: {result.error}</Text>}
              </View>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={runTests} disabled={loading}>
        {loading ?
          <ActivityIndicator color='white' size='small' />
        : <Text style={styles.buttonText}>Run Network Tests</Text>}
      </TouchableOpacity>
    </View>
  );
}

export const screenConfig: ScreenConfig = {
  name: 'Brotli',
  component: BrotliScreen,
  options: {
    headerShown: true,
    title: 'Brotli',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusLabel: {
    fontSize: 16,
    color: '#333',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsLabel: {
    fontSize: 14,
    color: '#666',
  },
  statsValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  testResult: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  testUrl: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  testDetails: {
    gap: 4,
  },
  testStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  testDetail: {
    fontSize: 12,
    color: '#666',
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    fontStyle: 'italic',
  },
});

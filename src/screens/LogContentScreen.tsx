import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
import { ScreenBaseProps } from '../common/types/ScreenBaseProps';

export const LogContentScreen = ({ route }: ScreenBaseProps) => {
  const { logFilePath } = route.params;
  const [logContent, setLogContent] = useState('Loading log content...');

  useEffect(() => {
    const readLogContent = async () => {
      try {
        const content = await RNFS.readFile(logFilePath, 'utf8');
        setLogContent(content);
      } catch (error) {
        setLogContent(`Error reading log file: ${error.message}`);
        console.error('Error reading log file:', error);
      }
    };

    readLogContent();
  }, [logFilePath]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log File: {logFilePath.split('/').pop()}</Text>
      <ScrollView style={styles.logContainer}>
        <Text style={styles.logText}>{logContent}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  logText: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
});

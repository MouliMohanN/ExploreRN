import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';
import { ScreenConfig } from '../../common/navigation/conventions';

export default function LogContentScreen({ route, navigation }: ScreenBaseProps) {
  const { logFilePath } = route.params as { logFilePath: string };
  const [logContent, setLogContent] = useState('Loading log content...');

  const fileName = logFilePath.split('/').pop();

  const onShare = async () => {
    try {
      const content = await RNFS.readFile(logFilePath, 'utf8');
      const shareOptions = {
        title: `Share Log File: ${fileName}`,
        message: `Log file from my app: ${fileName}\n\n${content.substring(0, 500)}... (full log attached)`,
        url: `file://${logFilePath}`,
        type: 'text/plain',
        filename: fileName,
      };
      await Share.open(shareOptions);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      Alert.alert('Share Error', `Failed to share log file: ${errorMessage}`);
      console.error('Failed to share log file:', errorMessage);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onShare} style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, onShare]);

  useEffect(() => {
    const readLogContent = async () => {
      try {
        const content = await RNFS.readFile(logFilePath, 'utf8');
        setLogContent(content);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setLogContent(`Error reading log file: ${errorMessage}`);
        console.error('Error reading log file:', errorMessage);
      }
    };

    readLogContent();
  }, [logFilePath]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log File: ${fileName}</Text>
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
  shareButton: {
    marginRight: 10,
    padding: 5,
  },
  shareButtonText: {
    color: '#007AFF', // iOS blue color
    fontSize: 16,
  },
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'LogContent',
  component: LogContentScreen,
  options: {
    headerShown: true,
    title: 'Log Content',
  },
};

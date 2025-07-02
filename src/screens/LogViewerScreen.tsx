import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getLogFilePaths } from '../common/utils/logger/logFileName';
import { ScreenNames } from '../navigation';
import { ScreenBaseProps } from '../common/types/ScreenBaseProps';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

export const LogViewerScreen = ({ navigation }: ScreenBaseProps) => {
  const [logFiles, setLogFiles] = useState<string[]>([]);

  const fetchLogFiles = async () => {
    const files = await getLogFilePaths();
    setLogFiles(files);
  };

  useEffect(() => {
    fetchLogFiles();
  }, []);

  const onShareAll = async () => {
    try {
      if (logFiles.length === 0) {
        Alert.alert('No Logs', 'There are no log files to share.');
        return;
      }

      const fileUris = logFiles.map(filePath => `file://${filePath}`);

      const shareOptions = {
        title: 'Share All Log Files',
        urls: fileUris,
        type: 'text/plain',
        message: 'Here are all the log files from my app.',
      };

      await Share.open(shareOptions);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : String(error);
      Alert.alert('Share Error', `Failed to share all log files: ${errorMessage}`);
      console.error('Failed to share all log files:', errorMessage);
    }
  };

  const onShareIndividual = async (filePath: string) => {
    try {
      const fileName = filePath.split('/').pop();
      const shareOptions = {
        title: `Share Log File: ${fileName}`,
        url: `file://${filePath}`,
        type: 'text/plain',
        filename: fileName,
      };
      await Share.open(shareOptions);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : String(error);
      Alert.alert('Share Error', `Failed to share log file: ${errorMessage}`);
      console.error('Failed to share log file:', errorMessage);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onShareAll} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Share All</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, onShareAll]);

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.logItemContainer}>
      <TouchableOpacity
        style={styles.logItem}
        onPress={() => navigation.navigate(ScreenNames.LogContent, { logFilePath: item })}
      >
        <Text style={styles.logItemText}>{item.split('/').pop()}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onShareIndividual(item)} style={styles.shareIndividualButton}>
        <Text style={styles.shareIndividualButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Log Files</Text>
      {logFiles.length > 0 ? (
        <FlatList
          data={logFiles}
          renderItem={renderItem}
          keyExtractor={item => item}
          style={styles.listContainer}
        />
      ) : (
        <Text>No log files found.</Text>
      )}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  logItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  logItem: {
    flex: 1,
    marginRight: 10,
  },
  logItemText: {
    fontSize: 14,
  },
  headerButton: {
    marginRight: 10,
    padding: 5,
  },
  headerButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  shareIndividualButton: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  shareIndividualButtonText: {
    fontSize: 12,
    color: '#333',
  },
});

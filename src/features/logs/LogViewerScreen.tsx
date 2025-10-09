import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';
import { getLogFilePaths } from '../../common/utils/logger/loggers/fileLogger';

export default function LogViewerScreen({ navigation }: ScreenBaseProps) {
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

      const fileUris = logFiles.map((filePath) => `file://${filePath}`);

      const shareOptions = {
        title: 'Share All Log Files',
        urls: fileUris,
        type: 'text/plain',
        message: 'Here are all the log files from my app.',
      };

      await Share.open(shareOptions);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
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
      const errorMessage = error instanceof Error ? error.message : String(error);
      Alert.alert('Share Error', `Failed to share log file: ${errorMessage}`);
      console.error('Failed to share log file:', errorMessage);
    }
  };

  const onDeleteAllLogs = () => {
    Alert.alert(
      'Delete All Logs',
      'Are you sure you want to delete all log files? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              for (const filePath of logFiles) {
                await RNFS.unlink(filePath);
              }
              fetchLogFiles(); // Refresh the list
              Alert.alert('Success', 'All log files deleted.');
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : String(error);
              Alert.alert('Delete Error', `Failed to delete all log files: ${errorMessage}`);
              console.error('Failed to delete all log files:', errorMessage);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const onDeleteIndividualLog = (filePath: string) => {
    const fileName = filePath.split('/').pop();
    Alert.alert(
      'Delete Log File',
      `Are you sure you want to delete ${fileName}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await RNFS.unlink(filePath);
              fetchLogFiles(); // Refresh the list
              Alert.alert('Success', `${fileName} deleted.`);
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : String(error);
              Alert.alert('Delete Error', `Failed to delete ${fileName}: ${errorMessage}`);
              console.error('Failed to delete log file:', errorMessage);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Log Files</Text>
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity onPress={onShareAll} style={styles.topButton}>
          <Text style={styles.topButtonText}>Share All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeleteAllLogs} style={styles.topButton}>
          <Text style={styles.topButtonText}>Delete All</Text>
        </TouchableOpacity>
      </View>
      {logFiles.length > 0 ?
        <FlatList
          data={logFiles}
          renderItem={({ item }) => (
            <View style={styles.logItemContainer}>
              <TouchableOpacity
                style={styles.logItem}
                onPress={() => navigation.navigate('LogContent', { logFilePath: item })}
              >
                <Text style={styles.logItemText}>{item.split('/').pop()}</Text>
              </TouchableOpacity>
              <View style={styles.logItemActions}>
                <TouchableOpacity onPress={() => onShareIndividual(item)} style={styles.actionButton}>
                  <Icon name='share-variant' size={20} color='#333' />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onDeleteIndividualLog(item)}
                  style={[styles.actionButton, styles.deleteButton]}
                >
                  <Icon name='delete' size={20} color='#fff' />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item}
          style={styles.listContainer}
        />
      : <Text>No log files found.</Text>}
    </View>
  );
}

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
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: '100%',
  },
  topButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  topButtonText: {
    color: '#fff',
    fontSize: 16,
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
  logItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
  },
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'LogViewer',
  component: LogViewerScreen,
  options: {
    headerShown: true,
    title: 'Available Logs',
  },
};

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getLogFilePaths } from '../common/utils/logger/logFileName';
import { ScreenNames } from '../navigation';
import { ScreenBaseProps } from '../common/types/ScreenBaseProps';

export const LogViewerScreen = ({ navigation }: ScreenBaseProps) => {
  const [logFiles, setLogFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchLogFiles = async () => {
      const files = await getLogFilePaths();
      setLogFiles(files);
    };

    fetchLogFiles();
  }, []);

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.logItem}
      onPress={() => navigation.navigate(ScreenNames.LogContent, { logFilePath: item })}
    >
      <Text style={styles.logItemText}>{item.split('/').pop()}</Text>
    </TouchableOpacity>
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
  logItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  logItemText: {
    fontSize: 14,
  },
});
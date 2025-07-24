import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

Dimensions.get('window');

interface TabConfig {
  key: string;
  title: string;
  component: React.ComponentType<any>;
}

interface TopTabViewProps {
  tabs: TabConfig[];
  initialIndex?: number;
}

export const TopTabView: React.FC<TopTabViewProps> = ({ tabs, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const renderScene = () => {
    const ActiveComponent = tabs[currentIndex].component;
    return <ActiveComponent />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabItem, currentIndex === index && styles.activeTabItem]}
            onPress={() => setCurrentIndex(index)}
          >
            <Text style={[styles.tabText, currentIndex === index && styles.activeTabText]}>{tab.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>{renderScene()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TopTabView } from '../../common/components/tabView/TopTabView';

const TabScreen1 = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>Content of Tab 1</Text>
  </View>
);

const TabScreen2 = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>Content of Tab 2</Text>
  </View>
);

const TabScreen3 = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>Content of Tab 3</Text>
  </View>
);

export const TopTabViewExampleScreen: React.FC = () => {
  const tabs = [
    { key: 'tab1', title: 'First', component: TabScreen1 },
    { key: 'tab2', title: 'Second', component: TabScreen2 },
    { key: 'tab3', title: 'Third', component: TabScreen3 },
  ];

  return (
    <View style={styles.container}>
      <TopTabView
        tabs={tabs}
        initialIndex={0}
        tabBarOptions={{
          backgroundColor: '#e0e0e0',
          activeLabelColor: '#007AFF',
          inactiveLabelColor: '#888',
          indicatorColor: '#007AFF',
          indicatorHeight: 4,
          style: { borderBottomWidth: 0 },
          itemStyle: { paddingVertical: 10 },
          labelStyle: { fontSize: 18 },
          activeLabelStyle: { fontWeight: 'bold' },
        }}
        contentOptions={{
          style: { backgroundColor: '#f9f9f9' },
          sceneStyle: { justifyContent: 'center', alignItems: 'center' },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 50, // Adjust as needed for status bar/safe area
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

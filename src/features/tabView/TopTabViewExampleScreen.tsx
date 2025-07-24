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
        tabBarStyle={{
          backgroundColor: '#e0e0e0',
          borderBottomWidth: 0,
        }}
        tabItemStyle={{
          paddingVertical: 10,
        }}
        tabTextStyle={{
          fontSize: 18,
        }}
        activeTabTextStyle={{
          fontWeight: 'bold',
        }}
        indicatorStyle={{
          backgroundColor: '#007AFF',
          height: 4,
        }}
        contentContainerStyle={{
          backgroundColor: '#f9f9f9',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        swipeEnabled={true}
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
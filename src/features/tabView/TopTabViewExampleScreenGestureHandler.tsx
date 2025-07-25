import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TopTabViewV2 } from '../../common/components/tabViewV2/TopTabViewV2';

// Define TabScreen components outside the main component for better reusability and performance
const TabScreen1 = () => {
  console.log('TabScreen1 rendered');
  useEffect(() => {
    console.log('TabScreen1 mounted');
    return () => {
      console.log('TabScreen1 unmounted');
    };
  }, []);
  return (
    <View style={localStyles.tabContent}>
      <Text style={localStyles.tabText}>Content of Tab 1</Text>
    </View>
  );
};

const TabScreen2 = () => {
  console.log('TabScreen2 rendered');
  useEffect(() => {
    console.log('TabScreen2 mounted');
    return () => {
      console.log('TabScreen2 unmounted');
    };
  }, []);
  return (
    <View style={localStyles.tabContent}>
      <Text style={localStyles.tabText}>Content of Tab 2</Text>
    </View>
  );
};

const TabScreen3 = () => {
  console.log('TabScreen3 rendered');
  useEffect(() => {
    console.log('TabScreen3 mounted');
    return () => {
      console.log('TabScreen3 unmounted');
    };
  }, []);
  return (
    <View style={localStyles.tabContent}>
      <Text style={localStyles.tabText}>Content of Tab 3</Text>
    </View>
  );
};

const TabScreen4 = () => {
  console.log('TabScreen4 rendered');
  useEffect(() => {
    console.log('TabScreen4 mounted');
    return () => {
      console.log('TabScreen4 unmounted');
    };
  }, []);
  return (
    <View style={localStyles.tabContent}>
      <Text style={localStyles.tabText}>Content of Tab 4</Text>
    </View>
  );
};

const TabScreen5 = () => {
  console.log('TabScreen5 rendered');
  useEffect(() => {
    console.log('TabScreen5 mounted');
    return () => {
      console.log('TabScreen5 unmounted');
    };
  }, []);
  return (
    <View style={localStyles.tabContent}>
      <Text style={localStyles.tabText}>Content of Tab 5</Text>
    </View>
  );
};

const TabScreen6 = () => {
  console.log('TabScreen6 rendered');
  useEffect(() => {
    console.log('TabScreen6 mounted');
    return () => {
      console.log('TabScreen6 unmounted');
    };
  }, []);
  return (
    <View style={localStyles.tabContent}>
      <Text style={localStyles.tabText}>Content of Tab 6</Text>
    </View>
  );
};

export const TopTabViewExampleScreenGestureHandler: React.FC = () => {
  const tabs = [
    { key: 'tab1', title: 'First', component: TabScreen1 },
    { key: 'tab2', title: 'Second', component: TabScreen2 },
    { key: 'tab3', title: 'Third', component: TabScreen3 },
    { key: 'tab4', title: 'Fourth', component: TabScreen4 },
    { key: 'tab5', title: 'Fifth', component: TabScreen5 },
    { key: 'tab6', title: 'Sixth', component: TabScreen6 },
  ];

  const handlePageSelected = (index: number) => {
    console.log('TopTabViewExampleScreenGestureHandler: onPageSelected received index:', index);
  };

  return (
    <View style={localStyles.container}>
      <TopTabViewV2
        tabs={tabs}
        initialIndex={0}
        onTabChange={handlePageSelected} // Pass the state setter to onTabChange
        tabBarStyle={{
          backgroundColor: '#e0e0e0',
          borderBottomWidth: 0,
        }}
        tabItemStyle={{
          paddingVertical: 10,
          paddingHorizontal: 20,
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
        swipeEnabled={false}
        pageLimit={1}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
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
  activeTabInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

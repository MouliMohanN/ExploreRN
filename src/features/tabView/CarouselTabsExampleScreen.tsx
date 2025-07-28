import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { CaruouselTabs } from '../../common/components/tabViewV3/CaruouselTabs';
import { TabConfig } from '../../common/components/tabViewV3/types';
import { localStyles } from './TopTabViewExampleScreenGestureHandler';

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

export const CarouselTabsExampleScreen = () => {
  const tabItems = [
    { key: 'tab1', title: 'First' },
    { key: 'tab2', title: 'Second' },
    { key: 'tab3', title: 'Third' },
    { key: 'tab4', title: 'Fourth' },
    { key: 'tab5', title: 'Fifth' },
    { key: 'tab6', title: 'Sixth' },
  ];

  const renderTabBarItem = (tabKey: string, isActive: boolean) => {
    const tab = tabItems.find((item) => item.key === tabKey);
    const color = isActive ? '#007AFF' : '#333';
    const fontWeight = isActive ? 'bold' : 'normal';
    console.log('renderTabBarItem', tabKey, isActive);
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, height: 50 }}>
        <Text style={{ color, fontWeight }}>{tab?.title}</Text>
      </View>
    );
  };

  const tabs: Array<TabConfig> = [
    { key: 'tab1', renderTabBarItem, component: TabScreen1 },
    { key: 'tab2', renderTabBarItem, component: TabScreen2 },
    { key: 'tab3', renderTabBarItem, component: TabScreen3 },
    { key: 'tab4', renderTabBarItem, component: TabScreen4 },
    { key: 'tab5', renderTabBarItem, component: TabScreen5 },
    { key: 'tab6', renderTabBarItem, component: TabScreen6 },
  ];

  return (
    <CaruouselTabs
      tabs={tabs}
      tabBarIndicatorStyle={{ backgroundColor: '#007AFF', height: 4 }}
      tabScreenContainerStyle={{ flex: 1 }}
    />
  );
};

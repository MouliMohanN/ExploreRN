import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TopTabView } from '../../common/components/tabView/TopTabView';
import { ScreenConfig } from '../../common/navigation/conventions';
import { logger } from '../../common/utils/logger/logger';

// Define TabScreen components outside the main component for better reusability and performance
const TabScreen1 = () => {
  logger.info('TabScreen1 rendered');
  useEffect(() => {
    logger.info('TabScreen1 mounted');
    return () => {
      logger.info('TabScreen1 unmounted');
    };
  }, []);
  return (
    <View style={localStyles.tabContent}>
      <Text style={localStyles.tabText}>Content of Tab 1</Text>
    </View>
  );
};

const TabScreen2 = () => {
  logger.info('TabScreen2 rendered');
  useEffect(() => {
    logger.info('TabScreen2 mounted');
    return () => {
      logger.info('TabScreen2 unmounted');
    };
  }, []);
  return (
    <View style={localStyles.tabContent}>
      <Text style={localStyles.tabText}>Content of Tab 2</Text>
    </View>
  );
};

const TabScreen3 = () => {
  logger.info('TabScreen3 rendered');
  useEffect(() => {
    logger.info('TabScreen3 mounted');
    return () => {
      logger.info('TabScreen3 unmounted');
    };
  }, []);
  return (
    <View style={localStyles.tabContent}>
      <Text style={localStyles.tabText}>Content of Tab 3</Text>
    </View>
  );
};

const TabScreen4 = () => {
  logger.info('TabScreen4 rendered');
  useEffect(() => {
    logger.info('TabScreen4 mounted');
    return () => {
      logger.info('TabScreen4 unmounted');
    };
  }, []);
  return (
    <View style={localStyles.tabContent}>
      <Text style={localStyles.tabText}>Content of Tab 4</Text>
    </View>
  );
};

const TabScreen5 = () => {
  logger.info('TabScreen5 rendered');
  useEffect(() => {
    logger.info('TabScreen5 mounted');
    return () => {
      logger.info('TabScreen5 unmounted');
    };
  }, []);
  return (
    <View style={localStyles.tabContent}>
      <Text style={localStyles.tabText}>Content of Tab 5</Text>
    </View>
  );
};

const TabScreen6 = () => {
  logger.info('TabScreen6 rendered');
  useEffect(() => {
    logger.info('TabScreen6 mounted');
    return () => {
      logger.info('TabScreen6 unmounted');
    };
  }, []);
  return (
    <View style={localStyles.tabContent}>
      <Text style={localStyles.tabText}>Content of Tab 6</Text>
    </View>
  );
};

export default function TopTabViewExampleScreenPagerView() {
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount((prevCount) => prevCount + 1);
  //   });

  //   return () => clearInterval(interval);
  // }, []);
  const tabs = [
    { key: 'tab1', title: 'First', component: TabScreen1 },
    { key: 'tab2', title: 'Second', component: TabScreen2 },
    { key: 'tab3', title: 'Third', component: TabScreen3 },
    { key: 'tab4', title: 'Fourth', component: TabScreen4 },
    { key: 'tab5', title: 'Fifth', component: TabScreen5 },
    { key: 'tab6', title: 'Sixth', component: TabScreen6 },
  ];

  const handlePageSelected = (index: number) => {
    logger.info('TopTabViewExampleScreenPagerView: onPageSelected received index:', index);
  };

  logger.info('TopTabViewExampleScreenPagerView rendered');

  return (
    <View style={localStyles.container}>
      {/* <Text style={localStyles.counterText}>Count: {count}</Text> */}
      <TopTabView
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
        swipeEnabled={true}
        pageLimit={1}
      />
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'TabViewTopPagerView',
  component: TopTabViewExampleScreenPagerView,
  options: {
    title: 'Top TabView - ViewPager',
    headerShown: true,
  },
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
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#ffe0b2',
  },
});

import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CarouselTabs } from '../../common/components/tabViewV3/CarouselTabs';
import { TabConfig } from '../../common/components/tabViewV3/types';
import { ActiveTabContext, ActiveTabContextValue } from './ActiveTabContext';
import { CounterContext } from './CounterContext';
import { useTabScreenData } from './useTabScreenData';

// --- Individual Tab Screens ---

type TabScreenProps = {
  tabTitle: string;
  tabIndex: number;
};

const TabScreen1: React.FC<TabScreenProps> = ({ tabTitle, tabIndex }) => {
  const { count, isFocused, shouldRender } = useTabScreenData(tabIndex);

  useEffect(() => {
    console.log('TabScreen1 mounted');
    return () => console.log('TabScreen1 unmounted');
  }, []);

  if (!shouldRender) {
    return null;
  }

  console.log('TabScreen1 rendered');
  return (
    <View style={Styles.tabContent}>
      <Text style={Styles.tabText}>Content of {tabTitle}</Text>
      <Text style={Styles.tabDetailsText}>Index: {tabIndex}</Text>
      <Text style={Styles.tabDetailsText}>Render: {shouldRender ? 'Yes' : 'No'}</Text>
      <Text style={[Styles.tabDetailsText, { color: isFocused ? 'green' : 'red', fontWeight: 'bold' }]}>
        Is Active: {isFocused ? 'Yes' : 'No'}
      </Text>
      <Text style={Styles.counterText}>Count: {count}</Text>
    </View>
  );
};

const TabScreen2: React.FC<TabScreenProps> = ({ tabTitle, tabIndex }) => {
  const { count, isFocused, shouldRender } = useTabScreenData(tabIndex);

  useEffect(() => {
    console.log('TabScreen2 mounted');
    return () => console.log('TabScreen2 unmounted');
  }, []);

  if (!shouldRender) {
    return null;
  }

  console.log('TabScreen2 rendered');
  return (
    <View style={Styles.tabContent}>
      <Text style={Styles.tabText}>Content of {tabTitle}</Text>
      <Text style={Styles.tabDetailsText}>Index: {tabIndex}</Text>
      <Text style={Styles.tabDetailsText}>Render: {shouldRender ? 'Yes' : 'No'}</Text>
      <Text style={[Styles.tabDetailsText, { color: isFocused ? 'green' : 'red', fontWeight: 'bold' }]}>
        Is Active: {isFocused ? 'Yes' : 'No'}
      </Text>
      <Text style={Styles.counterText}>Count: {count}</Text>
    </View>
  );
};

const TabScreen3: React.FC<TabScreenProps> = ({ tabTitle, tabIndex }) => {
  const { count, isFocused, shouldRender } = useTabScreenData(tabIndex);

  useEffect(() => {
    console.log('TabScreen3 mounted');
    return () => console.log('TabScreen3 unmounted');
  }, []);

  if (!shouldRender) {
    return null;
  }

  console.log('TabScreen3 rendered');
  return (
    <View style={Styles.tabContent}>
      <Text style={Styles.tabText}>Content of {tabTitle}</Text>
      <Text style={Styles.tabDetailsText}>Index: {tabIndex}</Text>
      <Text style={Styles.tabDetailsText}>Render: {shouldRender ? 'Yes' : 'No'}</Text>
      <Text style={[Styles.tabDetailsText, { color: isFocused ? 'green' : 'red', fontWeight: 'bold' }]}>
        Is Active: {isFocused ? 'Yes' : 'No'}
      </Text>
      <Text style={Styles.counterText}>Count: {count}</Text>
    </View>
  );
};

const TabScreen4: React.FC<TabScreenProps> = ({ tabTitle, tabIndex }) => {
  const { count, isFocused, shouldRender } = useTabScreenData(tabIndex);

  useEffect(() => {
    console.log('TabScreen4 mounted');
    return () => console.log('TabScreen4 unmounted');
  }, []);

  if (!shouldRender) {
    return null;
  }

  console.log('TabScreen4 rendered');
  return (
    <View style={Styles.tabContent}>
      <Text style={Styles.tabText}>Content of {tabTitle}</Text>
      <Text style={Styles.tabDetailsText}>Index: {tabIndex}</Text>
      <Text style={Styles.tabDetailsText}>Render: {shouldRender ? 'Yes' : 'No'}</Text>
      <Text style={[Styles.tabDetailsText, { color: isFocused ? 'green' : 'red', fontWeight: 'bold' }]}>
        Is Active: {isFocused ? 'Yes' : 'No'}
      </Text>
      <Text style={Styles.counterText}>Count: {count}</Text>
    </View>
  );
};

const TabScreen5: React.FC<TabScreenProps> = ({ tabTitle, tabIndex }) => {
  const { count, isFocused, shouldRender } = useTabScreenData(tabIndex);

  useEffect(() => {
    console.log('TabScreen5 mounted');
    return () => console.log('TabScreen5 unmounted');
  }, []);

  if (!shouldRender) {
    return null;
  }

  console.log('TabScreen5 rendered');
  return (
    <View style={Styles.tabContent}>
      <Text style={Styles.tabText}>Content of {tabTitle}</Text>
      <Text style={Styles.tabDetailsText}>Index: {tabIndex}</Text>
      <Text style={Styles.tabDetailsText}>Render: {shouldRender ? 'Yes' : 'No'}</Text>
      <Text style={[Styles.tabDetailsText, { color: isFocused ? 'green' : 'red', fontWeight: 'bold' }]}>
        Is Active: {isFocused ? 'Yes' : 'No'}
      </Text>
      <Text style={Styles.counterText}>Count: {count}</Text>
    </View>
  );
};

const TabScreen6: React.FC<TabScreenProps> = ({ tabTitle, tabIndex }) => {
  const { count, isFocused, shouldRender } = useTabScreenData(tabIndex);

  useEffect(() => {
    console.log('TabScreen6 mounted');
    return () => console.log('TabScreen6 unmounted');
  }, []);

  if (!shouldRender) {
    return null;
  }

  console.log('TabScreen6 rendered');
  return (
    <View style={Styles.tabContent}>
      <Text style={Styles.tabText}>Content of {tabTitle}</Text>
      <Text style={Styles.tabDetailsText}>Index: {tabIndex}</Text>
      <Text style={Styles.tabDetailsText}>Render: {shouldRender ? 'Yes' : 'No'}</Text>
      <Text style={[Styles.tabDetailsText, { color: isFocused ? 'green' : 'red', fontWeight: 'bold' }]}>
        Is Active: {isFocused ? 'Yes' : 'No'}
      </Text>
      <Text style={Styles.counterText}>Count: {count}</Text>
    </View>
  );
};

// --- Main Screen Component ---

export const CarouselTabsExampleScreen = () => {
  const tabItems = useMemo(
    () => [
      { key: 'tab1', title: 'First' },
      { key: 'tab2', title: 'Second' },
      { key: 'tab3', title: 'Third' },
      { key: 'tab4', title: 'Fourth' },
      { key: 'tab5', title: 'Fifth' },
      { key: 'tab6', title: 'Sixth' },
    ],
    [],
  );

  const renderTabBarItem = (tabKey: string, isActive: boolean) => {
    const tab = tabItems.find((item) => item.key === tabKey);
    const color = isActive ? '#007AFF' : '#333';
    const fontWeight = isActive ? 'bold' : 'normal';
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, height: 50 }}>
        <Text style={{ color, fontWeight }}>{tab?.title}</Text>
      </View>
    );
  };

  const tabs: Array<TabConfig> = useMemo(
    () => [
      { key: 'tab1', renderTabBarItem, component: () => <TabScreen1 tabTitle='First' tabIndex={0} /> },
      { key: 'tab2', renderTabBarItem, component: () => <TabScreen2 tabTitle='Second' tabIndex={1} /> },
      { key: 'tab3', renderTabBarItem, component: () => <TabScreen3 tabTitle='Third' tabIndex={2} /> },
      { key: 'tab4', renderTabBarItem, component: () => <TabScreen4 tabTitle='Fourth' tabIndex={3} /> },
      { key: 'tab5', renderTabBarItem, component: () => <TabScreen5 tabTitle='Fifth' tabIndex={4} /> },
      { key: 'tab6', renderTabBarItem, component: () => <TabScreen6 tabTitle='Sixth' tabIndex={5} /> },
    ],
    [],
  );

  const [count, setCount] = useState(0);
  const [activeTabContextValue, setActiveTabContextValue] = useState<ActiveTabContextValue>({
    currentIndex: 0,
    offscreenPageLimit: 1, // Assuming default offscreenPageLimit for CarouselTabs
    totalTabs: tabItems.length,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    });

    return () => clearInterval(interval);
  }, []);

  const handlePageSelected = (index: number) => {
    setActiveTabContextValue((prev) => ({
      ...prev,
      currentIndex: index,
    }));
    console.log('CarouselTabsExampleScreen: onPageSelected received index:', index);
  };

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      <ActiveTabContext.Provider value={activeTabContextValue}>
        <View style={{ flex: 1 }}>
          <Text style={Styles.counterText}>Count: {count}</Text>
          <CarouselTabs
            tabs={tabs}
            tabBarIndicatorStyle={{ backgroundColor: '#007AFF', height: 4 }}
            tabScreenContainerStyle={{ flex: 1 }}
            onPageSelected={handlePageSelected}
          />
        </View>
      </ActiveTabContext.Provider>
    </CounterContext.Provider>
  );
};

const Styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabDetailsText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  counterText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#ffe0b2',
    marginTop: 10,
  },
});

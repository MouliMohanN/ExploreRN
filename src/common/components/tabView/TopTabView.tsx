import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useSharedValue } from 'react-native-reanimated';
import { TabBar } from './TabBar';
import { TabContent } from './TabContent';
import type { TopTabViewProps } from './types';

export const TopTabView: React.FC<TopTabViewProps> = ({
  tabs,
  initialIndex = 0,
  onTabChange,
  tabBarStyle,
  tabItemStyle,
  activeTabItemStyle,
  tabTextStyle,
  activeTabTextStyle,
  indicatorStyle,
  contentContainerStyle,
  swipeEnabled = true,
  offscreenPageLimit = 1,
}) => {
  const currentIndex = useSharedValue(initialIndex);
  const pagerViewRef = useRef<PagerView>(null);

  const handleTabPress = (index: number) => {
    console.log('TopTabView: Tab pressed, new index:', index);
    currentIndex.value = index;
    if (pagerViewRef.current) {
      console.log('TopTabView: Calling pagerViewRef.current.setPage(', index, ')');
      pagerViewRef.current.setPage(index);
    } else {
      console.log('TopTabView: pagerViewRef.current is null');
    }
  };

  if (!tabs || tabs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tabs configured.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TabBar
        tabs={tabs}
        currentIndex={currentIndex}
        onTabPress={handleTabPress}
        tabBarStyle={tabBarStyle}
        tabItemStyle={tabItemStyle}
        activeTabItemStyle={activeTabItemStyle}
        tabTextStyle={tabTextStyle}
        activeTabTextStyle={activeTabTextStyle}
        indicatorStyle={indicatorStyle}
      />
      <TabContent
        tabs={tabs}
        currentIndex={currentIndex}
        swipeEnabled={swipeEnabled}
        contentContainerStyle={contentContainerStyle}
        pagerViewRef={pagerViewRef} // Pass the ref down to TabContent
        offscreenPageLimit={offscreenPageLimit}
        onPageSelected={onTabChange} // Pass the new prop down
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});

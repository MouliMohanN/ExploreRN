import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { TabBar } from './TabBar';
import { TabContent } from './TabContent';
import type { TopTabViewProps } from './types';
import PagerView from 'react-native-pager-view';

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
}) => {
  const currentIndex = useSharedValue(initialIndex);
  const pagerViewRef = useRef<PagerView>(null);

  const handleTabPress = (index: number) => {
    currentIndex.value = index;
    pagerViewRef.current?.setPage(index); // Directly tell PagerView to change page
    onTabChange?.(index);
  };

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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

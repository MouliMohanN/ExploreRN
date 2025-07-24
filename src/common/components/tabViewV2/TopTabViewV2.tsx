import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabBarV2 } from './TabBarV2';
import { TabContentV2 } from './TabContentV2';
import type { TopTabViewV2Props } from './typesV2';

export const TopTabViewV2: React.FC<TopTabViewV2Props> = ({
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
  pageLimit = 0,
  swipeEnabled = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleTabPress = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      onTabChange?.(index);
    },
    [onTabChange],
  );

  if (!tabs || tabs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tabs configured.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TabBarV2
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
      <TabContentV2
        tabs={tabs}
        currentIndex={currentIndex}
        onIndexChange={handleTabPress}
        contentContainerStyle={contentContainerStyle}
        pageLimit={pageLimit}
        swipeEnabled={swipeEnabled}
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

import React from 'react';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { logger } from '../../utils/logger/logger';
import type { TabContentProps } from './types';

export const TabContent: React.FC<TabContentProps> = ({
  tabs,
  currentIndex,
  swipeEnabled,
  contentContainerStyle,
  pagerViewRef,
  offscreenPageLimit = 1,
  onPageSelected, // New prop
}) => {
  return (
    <PagerView
      ref={pagerViewRef}
      style={[styles.pagerView, contentContainerStyle]}
      initialPage={currentIndex.value}
      scrollEnabled={swipeEnabled}
      onPageSelected={(e) => {
        logger.info('TabContent: PagerView onPageSelected - position:', e.nativeEvent.position);
        // Update the shared currentIndex when the user swipes
        currentIndex.value = e.nativeEvent.position;
        onPageSelected?.(e.nativeEvent.position); // Call the exposed prop
      }}
      offscreenPageLimit={offscreenPageLimit}
    >
      {tabs.map((tab) => {
        const Component = tab.component;
        return (
          <View key={tab.key} style={styles.page}>
            <Component />
          </View>
        );
      })}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import type { TabContentProps } from './types';

export const TabContent: React.FC<TabContentProps> = ({
  tabs,
  currentIndex,
  swipeEnabled,
  contentContainerStyle,
  pagerViewRef,
}) => {
  return (
    <PagerView
      ref={pagerViewRef}
      style={[styles.pagerView, contentContainerStyle]}
      initialPage={currentIndex.value}
      scrollEnabled={swipeEnabled}
      onPageSelected={(e) => {
        // Update the shared currentIndex when the user swipes
        currentIndex.value = e.nativeEvent.position;
      }}
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
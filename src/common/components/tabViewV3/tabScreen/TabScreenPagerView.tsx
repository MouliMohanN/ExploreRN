import React from 'react';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { TabScreenProps } from '../types';

type TabScreenPagerViewProps = TabScreenProps & {
  pagerViewRef: React.RefObject<PagerView | null>;
};
export const TabScreenPagerView: React.FC<TabScreenPagerViewProps> = ({
  tabs,
  currentIndex,
  swipeEnabled,
  contentContainerStyle,
  pagerViewRef,
  onPageSelected,
}) => {
  return (
    <PagerView
      ref={pagerViewRef}
      style={[styles.pagerView, contentContainerStyle]}
      initialPage={currentIndex}
      scrollEnabled={swipeEnabled}
      onPageSelected={(e) => {
        onPageSelected?.(e.nativeEvent.position);
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

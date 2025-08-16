import React from 'react';
import { View } from 'react-native';
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
      style={contentContainerStyle}
      initialPage={currentIndex}
      scrollEnabled={swipeEnabled}
      onPageSelected={(e) => {
        onPageSelected?.(e.nativeEvent.position);
      }}
    >
      {tabs.map((tab) => {
        const Component = tab.component;
        return (
          <View key={tab.key}>
            <Component />
          </View>
        );
      })}
    </PagerView>
  );
};

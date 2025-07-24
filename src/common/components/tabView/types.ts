import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type PagerView from 'react-native-pager-view';
import type { RefObject } from 'react';

export type TabConfig = {
  key: string;
  title: string;
  component: React.ComponentType<any>;
};

export type TopTabViewProps = {
  tabs: TabConfig[];
  initialIndex?: number;
  onTabChange?: (index: number) => void;
  tabBarStyle?: StyleProp<ViewStyle>;
  tabItemStyle?: StyleProp<ViewStyle>;
  activeTabItemStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
  activeTabTextStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  swipeEnabled?: boolean;
  offscreenPageLimit?: number; // New prop for preloading
  onPageSelected?: (index: number) => void; // New prop for PagerView's onPageSelected
};

export type TabBarProps = {
  tabs: TabConfig[];
  currentIndex: SharedValue<number>;
  onTabPress: (index: number) => void;
  tabBarStyle?: StyleProp<ViewStyle>;
  tabItemStyle?: StyleProp<ViewStyle>;
  activeTabItemStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
  activeTabTextStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
};

export type TabContentProps = {
  tabs: TabConfig[];
  currentIndex: SharedValue<number>;
  swipeEnabled?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  pagerViewRef: RefObject<PagerView>;
  offscreenPageLimit?: number; // New prop for preloading
  onPageSelected?: (index: number) => void; // New prop for PagerView's onPageSelected
};
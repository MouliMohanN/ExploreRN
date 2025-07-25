import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type TabConfigV2 = {
  key: string;
  title: string;
  component: React.FC<{ isFocused?: boolean }>;
};

export type TopTabViewV2Props = {
  tabs: TabConfigV2[];
  initialIndex?: number;
  onTabChange?: (index: number) => void;
  tabBarStyle?: StyleProp<ViewStyle>;
  tabItemStyle?: StyleProp<ViewStyle>;
  activeTabItemStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
  activeTabTextStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  pageLimit?: number;
  swipeEnabled?: boolean;
};

export type TabBarProps = {
  tabs: TabConfigV2[];
  currentIndex: number;
  onTabPress: (index: number) => void;
  tabBarStyle?: StyleProp<ViewStyle>;
  tabItemStyle?: StyleProp<ViewStyle>;
  activeTabItemStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
  activeTabTextStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
};

export type TabContentV2Props = {
  tabs: TabConfigV2[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  pageLimit?: number;
  swipeEnabled?: boolean;
};

export type TabLayout = {
  x: number;
  width: number;
};

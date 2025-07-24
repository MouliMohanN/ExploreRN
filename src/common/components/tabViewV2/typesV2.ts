import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export type TabConfigV2 = {
  key: string;
  title: string;
  component: React.ComponentType<any>;
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
};

export type TabBarProps = {
  tabs: TabConfigV2[];
  currentIndex: number; // Changed from SharedValue<number>
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
  currentIndex: number; // Changed from SharedValue<number>
  contentContainerStyle?: StyleProp<ViewStyle>;
};

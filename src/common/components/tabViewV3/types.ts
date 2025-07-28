import { StyleProp, ViewStyle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export type TabConfig = {
    key: string;
    renderTabBarItem: (key: string, isActive: boolean) => React.JSX.Element;
  component: React.ComponentType<any>;
};

type TabIndicatorStyle = {
  backgroundColor?: string;
  height?: number;
};

export type TabBarProps = {
  tabs: TabConfig[];
  currentIndex: number;
  onTabPress: (index: number) => void;
  tabIndicatorStyle?: TabIndicatorStyle;
};

export type TabScreenProps = {
  tabs: TabConfig[];
  currentIndex: number;
  swipeEnabled?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onPageSelected?: (index: number) => void;
};

export type CarouselTabsProps = {
  // mandatory props
  tabs: TabConfig[];
  tabBarIndicatorStyle: TabIndicatorStyle;
  tabScreenContainerStyle: StyleProp<ViewStyle>;

  // optional props
  initialIndex?: number;
  swipeEnabled?: boolean;
  tabBarPosition?: 'top' | 'bottom';
  tabBarType?: 'matchParent' | 'scrollable';
  tabScreenType?: 'PagerView' | 'gestureHandler';
  offscreenPageLimit?: number;
  shouldHandleBackPressBehavior?: boolean;

  onPageSelected?: (index: number) => void;
};

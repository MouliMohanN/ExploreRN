import { StyleProp, ViewStyle } from 'react-native';

/**
 * Represents the complete configuration for a single tab within the Carousel.
 * This object serves as the blueprint for constructing both the tab bar item and its corresponding screen content.
 */
export type TabConfig = {
  /**
   * A unique string used to identify this tab.
   * It's crucial for React's reconciliation process (used as a `key`) and for internal state management.
   */
  key: string;

  /**
   * A render function that defines the UI for the tab in the tab bar.
   * This provides maximum flexibility for custom tab appearances.
   *
   * @param key The unique key of the tab.
   * @param isActive Indicates if this tab is the currently selected one. This can be used to apply different styles for active vs. inactive states (e.g., change text color, font weight, or icon).
   * @returns A React element to be rendered in the `TabBarScrollable` or `TabBarMatchParent` component.
   */
  renderTabBarItem: (key: string, isActive: boolean) => React.JSX.Element;

  /**
   * The React Component that will be rendered as the main content for this tab screen.
   */
  component: React.ComponentType<any>;
};

/**
 * Defines the style properties for the animated indicator that highlights the active tab.
 */
type TabIndicatorStyle = {
  /**
   * The color of the indicator line.
   * @default '#000000'
   */
  backgroundColor?: string;
  /**
   * The thickness (height) of the indicator line.
   * @default 2
   */
  height?: number;
};

/**
 * Internal props passed from the main `CarouselTabs` component to the TabBar implementations
 * (`TabBarMatchParent` and `TabBarScrollable`). Not intended for direct use by consumers.
 * @internal
 */
export type TabBarProps = {
  tabs: TabConfig[];
  currentIndex: number;
  onTabPress: (index: number) => void;
  tabIndicatorStyle?: TabIndicatorStyle;
};

/**
 * Internal props passed from the main `CarouselTabs` component to the TabScreen implementations
 * (`TabScreenPagerView` and `TabScreenGestureHandler`). Not intended for direct use by consumers.
 * @internal
 */
export type TabScreenProps = {
  tabs: TabConfig[];
  currentIndex: number;
  swipeEnabled?: boolean;
  contentContainerStyle: StyleProp<ViewStyle>;
  onPageSelected?: (index: number) => void;
};

/**
 * Defines the public API for the `CarouselTabs` component.
 */
export type CarouselTabsProps = {
  // #region Mandatory props
  /**
   * The core configuration array that defines the tabs to be rendered.
   * The order of the tabs in this array determines their display order.
   */
  tabs: TabConfig[];

  /**
   * Customizes the appearance of the animated line that indicates the active tab.
   */
  tabBarIndicatorStyle: TabIndicatorStyle;

  /**
   * Style applied to the container View of each individual tab screen.
   * Useful for setting consistent padding or background color across all tab content pages.
   */
  tabScreenContainerStyle: StyleProp<ViewStyle>;
  // #endregion

  // #region Optional props
  /**
   * The index of the tab to be selected upon initial render.
   * @default 0
   */
  initialIndex?: number;

  /**
   * If `false`, the user cannot switch between tabs by swiping the content area.
   * They can still switch by tapping the tab bar items.
   * @default true
   */
  swipeEnabled?: boolean;

  /**
   * Determines the placement of the tab bar relative to the content.
   * @default 'top'
   */
  tabBarPosition?: 'top' | 'bottom';

  /**
   * Determines the layout and behavior of the tab bar.
   * - `'scrollable'`: (Default) Tabs are their natural width. If they exceed the screen width, the bar becomes horizontally scrollable. Ideal for many tabs.
   * - `'matchParent'`: Tabs are stretched to evenly fill the screen width. Best for a small, fixed number of tabs (e.g., 2-4).
   * @default 'scrollable'
   */
  tabBarType?: 'matchParent' | 'scrollable';

  /**
   * Determines the underlying implementation for the swipeable tab content area.
   * - `'PagerView'`: (Default) Uses `react-native-pager-view`. A library providing native-like performance. Recommended for most use cases.
   * - `'gestureHandler'`: A custom implementation using `react-native-reanimated` and `react-native-gesture-handler`.
   * @default 'PagerView'
   */
  tabScreenType?: 'PagerView' | 'gestureHandler';

  /**
   * Controls how many tabs are kept rendered in memory on either side of the active tab.
   * A higher value can make swiping to non-adjacent tabs feel faster but increases memory consumption.
   * This is passed to the underlying `TabScreenGestureHandler` to conditionally render components.
   * `PagerView` doesn't respect this prop.
   * @default 1
   */
  offscreenPageLimit?: number;

  /**
   * If `true`, on Android, pressing the hardware back button will navigate to the `initialIndex` tab
   * instead of closing the screen, providing a more intuitive navigation flow within the tab set.
   * @default true
   */
  shouldHandleBackPressBehavior?: boolean;
  // #endregion

  // #region Callbacks
  /**
   * A callback function that is invoked whenever the selected tab changes,
   * either through a swipe gesture or a tab bar press.
   * @param index The index of the newly selected tab.
   */
  onPageSelected?: (index: number) => void;
  // #endregion
};
''

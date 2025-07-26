import React, { useEffect, useRef } from 'react';
import { LayoutChangeEvent, NativeScrollEvent, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type { TabBarProps, TabConfigV2, TabLayout } from './typesV2';

interface TabItemProps {
  tab: TabConfigV2;
  index: number;
  currentIndex: number;
  onTabPress: (index: number) => void;
  onTabLayout: (index: number, tabLayout: TabLayout) => void;
  tabItemStyle?: TabBarProps['tabItemStyle'];
  activeTabItemStyle?: TabBarProps['activeTabItemStyle'];
  tabTextStyle?: TabBarProps['tabTextStyle'];
  activeTabTextStyle?: TabBarProps['activeTabTextStyle'];
}

const TabItem: React.FC<TabItemProps> = ({
  tab,
  index,
  currentIndex,
  onTabPress,
  onTabLayout,
  tabItemStyle,
  activeTabItemStyle,
  tabTextStyle,
  activeTabTextStyle,
}) => {
  const textAnimatedStyle = useAnimatedStyle(() => {
    const isActive = currentIndex === index;
    return {
      fontWeight: withSpring(isActive ? 'bold' : 'normal'),
      color: withTiming(isActive ? '#007AFF' : '#333'),
    };
  });

  const scale = useSharedValue(1);

  const touchableAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    onTabLayout(index, { x, width });
  };

  return (
    <Pressable
      key={tab.key}
      style={[styles.tabItem, tabItemStyle, currentIndex === index && activeTabItemStyle]}
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={() => {
        onTabPress(index);
      }}
      onLayout={onLayout}
    >
      <Animated.View style={touchableAnimatedStyle}>
        <Animated.Text
          style={[styles.tabText, tabTextStyle, textAnimatedStyle, currentIndex === index && activeTabTextStyle]}
        >
          {tab.title}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export const TabBarV2: React.FC<TabBarProps> = ({
  tabs,
  currentIndex,
  onTabPress,
  tabBarStyle,
  tabItemStyle,
  activeTabItemStyle,
  tabTextStyle,
  activeTabTextStyle,
  indicatorStyle,
}) => {
  const tabBarRef = useRef<Animated.FlatList>(null);
  const scrollX = useSharedValue(0);
  const tabBarWidth = useSharedValue(0);
  const tabBarX = useSharedValue(0);
  const tabBarIndex = useRef(0);
  const allTabsWidth = useRef<{ [key: number]: TabLayout }>({});

  useEffect(() => {
    updateTabBar(currentIndex, true);
  }, [currentIndex]);

  const onScroll = useAnimatedScrollHandler((event: NativeScrollEvent) => {
    scrollX.value = event.contentOffset.x;
    console.log('onScroll', event.contentOffset.x);
  });

  const getTabBarxValue = () => {
    let tabBarxValue = 0;
    for (let i = 0; i < tabBarIndex.current; i++) {
      tabBarxValue += allTabsWidth.current[i].width;
    }
    console.log('getTabBarxValue', tabBarxValue, tabBarIndex.current);
    return tabBarxValue;
  };

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(tabBarX.value - scrollX.value, { duration: 250 }),
        },
      ],
      width: tabBarWidth.value,
    };
  });

  const updateTabBar = (index: number, isSwipe = false) => {
    console.log('updateTabBar', allTabsWidth.current, index);
    const tabLayout = allTabsWidth.current[index];
    if (!tabLayout?.width) {
      // If layout not available, retry after a short delay
      setTimeout(() => updateTabBar(index), 50); // Retry after 50ms
      return;
    }
    const width = tabLayout.width;
    tabBarIndex.current = index;
    const tabBarXValue = getTabBarxValue();

    // First, initiate the scroll
    tabBarRef.current?.scrollToIndex({
      index,
      animated: isSwipe,
      viewPosition: 0.5,
    });

    // Then, after a short delay, animate the indicator
    setTimeout(() => {
      tabBarWidth.value = width;
      tabBarX.value = tabBarXValue;
    }, 100); // Adjust delay as needed for visual smoothness
  };

  const onTabPressInternal = (index: number) => {
    updateTabBar(index);
    onTabPress(index);
  };

  const onTabLayout = (index: number, tabLayout: TabLayout) => {
    console.log('onTabLayout', index, tabLayout);
    allTabsWidth.current[index] = tabLayout;
    if (index === currentIndex) {
      tabBarWidth.value = tabLayout.width;
      tabBarX.value = getTabBarxValue();
    }
  };

  return (
    <View style={[styles.tabBarContainer, tabBarStyle]}>
      <Animated.FlatList
        ref={tabBarRef}
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={({ item, index }) => (
          <TabItem
            tab={item}
            index={index}
            currentIndex={currentIndex}
            onTabPress={onTabPressInternal}
            onTabLayout={onTabLayout}
            tabItemStyle={tabItemStyle}
            activeTabItemStyle={activeTabItemStyle}
            tabTextStyle={tabTextStyle}
            activeTabTextStyle={activeTabTextStyle}
          />
        )}
        keyExtractor={(item) => item.key}
      />
      <Animated.View style={[styles.indicator, indicatorAnimatedStyle, indicatorStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 50,
  },
  tabText: {
    fontSize: 16,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: '#007AFF',
  },
});

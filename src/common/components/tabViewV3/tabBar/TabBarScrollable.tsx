import React, { useEffect, useRef } from 'react';
import { LayoutChangeEvent, NativeScrollEvent, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { TabBarProps, TabConfig } from '../types';

type TabLayout = {
  x: number;
  width: number;
};

type TabItemProps = {
  tab: TabConfig;
  index: number;
  currentIndex: number;
  onTabPress: (index: number) => void;
  onTabLayout: (index: number, tabLayout: TabLayout) => void;
};

const TabItem: React.FC<TabItemProps> = ({ tab, index, currentIndex, onTabPress, onTabLayout }) => {
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
      style={[Styles.tabItemContainer]}
      onPressIn={() => (scale.value = withSpring(0.75))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={() => {
        onTabPress(index);
      }}
      onLayout={onLayout}
    >
      <Animated.View style={touchableAnimatedStyle}>
        {tab.renderTabBarItem(tab.key, currentIndex === index)}
      </Animated.View>
    </Pressable>
  );
};

export const TabBarScrollable: React.FC<TabBarProps> = ({
  tabs,
  currentIndex,
  onTabPress: onTabPressProp,
  tabIndicatorStyle,
}) => {
  const tabBarRef = useRef<Animated.FlatList>(null);
  const scrollX = useSharedValue(0);
  const tabBarWidth = useSharedValue(0);
  const tabBarX = useSharedValue(0);
  const tabBarIndex = useRef(0);
  const allTabsWidth = useRef<{ [key: number]: TabLayout }>({});

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(tabBarX.value - scrollX.value, { duration: 100 }),
        },
      ],
      width: tabBarWidth.value,
    };
  });

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
    onTabPressProp(index);
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
    <View>
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
          />
        )}
        keyExtractor={(item) => item.key}
      />
      <Animated.View style={[Styles.indicator, indicatorAnimatedStyle, tabIndicatorStyle]} />
    </View>
  );
};

const Styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
  },
});

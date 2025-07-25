import React, { useRef } from 'react';
import { Dimensions, NativeScrollEvent, StyleSheet, Pressable, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type { TabBarProps, TabConfigV2 } from './typesV2';

const { width } = Dimensions.get('window');
const TAB_ITEM_WIDTH = width / 4; // Assuming 4 tabs visible at a time

interface TabItemProps {
  tab: TabConfigV2;
  index: number;
  currentIndex: number;
  onTabPress: (index: number) => void;
  tabItemStyle?: TabBarProps['tabItemStyle'];
  activeTabItemStyle?: TabBarProps['activeTabItemStyle'];
  tabTextStyle?: TabBarProps['tabTextStyle'];
  activeTabTextStyle?: TabBarProps['activeTabTextStyle'];
  tabBarRef: React.RefObject<Animated.FlatList>;
}

const TabItem: React.FC<TabItemProps> = ({
  tab,
  index,
  currentIndex,
  onTabPress,
  tabItemStyle,
  activeTabItemStyle,
  tabTextStyle,
  activeTabTextStyle,
  tabBarRef,
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

  return (
    <Pressable
      key={tab.key}
      style={[styles.tabItem, { width: TAB_ITEM_WIDTH }, tabItemStyle, currentIndex === index && activeTabItemStyle]}
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={() => {
        onTabPress(index);
        tabBarRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }}
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

  const onScroll = useAnimatedScrollHandler((event: NativeScrollEvent) => {
    scrollX.value = event.contentOffset.x;
  });

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(currentIndex * TAB_ITEM_WIDTH - scrollX.value, { duration: 250 }),
        },
      ],
      width: TAB_ITEM_WIDTH,
    };
  });

  return (
    <View style={[styles.tabBarContainer, tabBarStyle]}>
      <Animated.FlatList
        ref={tabBarRef}
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <TabItem
            tab={item}
            index={index}
            currentIndex={currentIndex}
            onTabPress={onTabPress}
            tabItemStyle={tabItemStyle}
            activeTabItemStyle={activeTabItemStyle}
            tabTextStyle={tabTextStyle}
            activeTabTextStyle={activeTabTextStyle}
            tabBarRef={tabBarRef}
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
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
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

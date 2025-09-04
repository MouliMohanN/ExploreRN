import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import type { TabBarProps } from './types';

const { width } = Dimensions.get('window');

export const TabBar: React.FC<TabBarProps> = ({
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
  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    const tabWidth = width / tabs.length;
    return {
      transform: [
        {
          translateX: withTiming(currentIndex.value * tabWidth, { duration: 200 }),
        },
      ],
      width: tabWidth,
    };
  });

  return (
    <View style={[styles.tabBar, tabBarStyle]}>
      {tabs.map((tab, index) => {
        const textAnimatedStyle = useAnimatedStyle(() => {
          const isActive = currentIndex.value === index;
          return {
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? '#007AFF' : '#333',
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
            style={[styles.tabItem, tabItemStyle, currentIndex.value === index && activeTabItemStyle]}
            onPressIn={() => (scale.value = withSpring(0.95))}
            onPressOut={() => (scale.value = withSpring(1))}
            onPress={() => onTabPress(index)}
          >
            <Animated.View style={touchableAnimatedStyle}>
              <Animated.Text style={[styles.tabText, tabTextStyle, textAnimatedStyle]}>{tab.title}</Animated.Text>
            </Animated.View>
          </Pressable>
        );
      })}
      <Animated.View style={[styles.indicator, indicatorStyle, indicatorAnimatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    // color and fontWeight are now handled by animated style
  },
  // activeTabText is no longer needed here as it's handled by animated style
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: '#007AFF',
  },
});

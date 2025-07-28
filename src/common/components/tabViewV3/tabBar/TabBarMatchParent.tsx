import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { TabBarProps } from '../types';

export const TabBarMatchParent: React.FC<TabBarProps> = ({
  tabs,
  currentIndex,
  onTabPress: onTabPressProp,
  tabIndicatorStyle,
}) => {
  const { width } = Dimensions.get('window');
  const tabWidth = width / tabs.length;

  const [activeIndex, setActiveIndex] = useState(currentIndex.value);

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(currentIndex.value * tabWidth, { duration: 200 }),
        },
      ],
      width: tabWidth,
    };
  });

  const onTabPress = (index: number) => {
    setActiveIndex(index);
    onTabPressProp(index);
  };

  return (
    <View style={Styles.tabBarContainer}>
      {tabs.map((tab, index) => {
        const scale = useSharedValue(1);

        const touchableAnimatedStyle = useAnimatedStyle(() => {
          return {
            transform: [{ scale: scale.value }],
          };
        });

        return (
          <Pressable
            key={index}
            style={[Styles.tabItemContainer, { width: tabWidth }]}
            onPressIn={() => (scale.value = withSpring(0.75))}
            onPressOut={() => (scale.value = withSpring(1))}
            onPress={() => onTabPress(index)}
          >
            <Animated.View style={touchableAnimatedStyle}>
              {tab.renderTabBarItem(tab.key, activeIndex === index)}
            </Animated.View>
          </Pressable>
        );
      })}
      <Animated.View style={[Styles.indicator, { ...tabIndicatorStyle }, indicatorAnimatedStyle]} />
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

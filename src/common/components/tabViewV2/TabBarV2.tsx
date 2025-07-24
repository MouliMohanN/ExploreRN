import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue, withSpring } from 'react-native-reanimated';
import type { TabBarProps } from './typesV2';

const { width } = Dimensions.get('window');

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
  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    const tabWidth = width / tabs.length;
    return {
      transform: [{
        translateX: withTiming(currentIndex * tabWidth, { duration: 200 }) // Use currentIndex directly
      }],
      width: tabWidth,
    };
  });

  return (
    <View style={[styles.tabBar, tabBarStyle]}>
      {tabs.map((tab, index) => {
        const textAnimatedStyle = useAnimatedStyle(() => {
          const isActive = currentIndex === index; // Use currentIndex directly
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
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabItem, tabItemStyle, currentIndex === index && activeTabItemStyle]} // Use currentIndex directly
            onPressIn={() => (scale.value = withSpring(0.95))}
            onPressOut={() => (scale.value = withSpring(1))}
            onPress={() => onTabPress(index)}
          >
            <Animated.View style={touchableAnimatedStyle}>
              <Animated.Text
                style={[
                  styles.tabText,
                  tabTextStyle,
                  textAnimatedStyle,
                ]}
              >
                {tab.title}
              </Animated.Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
      <Animated.View style={[styles.indicator, indicatorAnimatedStyle, indicatorStyle]} />
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
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: '#007AFF',
  },
});
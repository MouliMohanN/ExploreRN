import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import type { TabContentV2Props } from './typesV2';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.2;

export const TabContentV2: React.FC<TabContentV2Props> = ({
  tabs,
  currentIndex,
  onIndexChange,
  contentContainerStyle,
  pageLimit = 0,
  swipeEnabled = true,
}) => {
  const translationX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [{ translateX: translationX.value }],
      width: width * tabs.length,
      flexDirection: 'row',
    };
  });

  React.useEffect(() => {
    translationX.value = withSpring(-width * currentIndex);
  }, [currentIndex, translationX]);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      'worklet';
      translationX.value = -width * currentIndex + e.translationX;
    })
    .onEnd((e) => {
      'worklet';
      if (
        Math.abs(e.translationX) > SWIPE_THRESHOLD ||
        (Math.abs(e.velocityX) > 500 && Math.abs(e.translationX) > width * 0.1)
      ) {
        const newIndex = e.translationX < 0 ? currentIndex + 1 : currentIndex - 1;
        if (newIndex >= 0 && newIndex < tabs.length) {
          runOnJS(onIndexChange)(newIndex);
        } else {
          translationX.value = withSpring(-width * currentIndex);
        }
      } else {
        translationX.value = withSpring(-width * currentIndex);
      }
    });

  const content = (
    <Animated.View style={[styles.contentContainer, animatedStyle]}>
      {tabs.map((tab, index) => {
        const isFocused = currentIndex === index;
        const isAdjacent = Math.abs(currentIndex - index) <= pageLimit;

        return (
          <View key={index} style={[styles.page, contentContainerStyle]}>
            {isAdjacent ? React.createElement(tab.component, { isFocused }) : <View />}
          </View>
        );
      })}
    </Animated.View>
  );

  return swipeEnabled ? <GestureDetector gesture={panGesture}>{content}</GestureDetector> : content;
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  page: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { TabScreenProps } from '../types';

type TabScreenGestureHandlerProps = TabScreenProps & {
  offScreenPageLimit: number;
};

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.2;

export const TabScreenGestureHandler: React.FC<TabScreenGestureHandlerProps> = ({
  tabs,
  currentIndex,
  swipeEnabled,
  offScreenPageLimit,
  contentContainerStyle,
  onPageSelected,
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
    translationX.value = withSpring(-width * currentIndex, { damping: 500, stiffness: 1000 });
  }, [currentIndex, translationX]);

  const panGesture =
    swipeEnabled ?
      Gesture.Pan()
        .onUpdate((e) => {
          'worklet';
          translationX.value = -width * currentIndex + e.translationX;
        })
        .onEnd((e) => {
          'worklet';
          let targetIndex = currentIndex;
          if (
            Math.abs(e.translationX) > SWIPE_THRESHOLD ||
            (Math.abs(e.velocityX) > 500 && Math.abs(e.translationX) > width * 0.1)
          ) {
            targetIndex = e.translationX < 0 ? currentIndex + 1 : currentIndex - 1;
          }

          if (targetIndex >= 0 && targetIndex < tabs.length) {
            translationX.value = withSpring(-width * targetIndex, { damping: 500, stiffness: 1000 });
            if (onPageSelected) {
              runOnJS(onPageSelected)(targetIndex);
            }
          } else {
            translationX.value = withSpring(-width * currentIndex, { damping: 500, stiffness: 1000 });
          }
        })
    : null;

  const content = (
    <Animated.View style={[styles.contentContainer, animatedStyle]}>
      {tabs.map((tab, index) => {
        const isFocused = currentIndex === index;
        const isAdjacent = Math.abs(currentIndex - index) < offScreenPageLimit;
        const Component = tab.component;
        return (
          <View key={tab.key} style={[styles.page, contentContainerStyle]}>
            {isAdjacent ? React.createElement(Component, { isFocused }) : <View />}
            {/* <Component isFocused={isFocused} /> */}
          </View>
        );
      })}
    </Animated.View>
  );

  return swipeEnabled ? <GestureDetector gesture={panGesture!}>{content}</GestureDetector> : content;
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

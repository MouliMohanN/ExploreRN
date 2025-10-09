import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

export default function AnimationsHomeScreen({}: ScreenBaseProps): React.ReactElement {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // snap points
  const snapPoints = useMemo(() => ['25%', '100%'], []);

  // Screen dimensions
  const screenHeight = Dimensions.get('window').height;

  // Animated position value from bottom sheet
  const animatedPosition = useSharedValue(0);
  const screenHeightAnimated = useSharedValue(screenHeight);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };

  const handleSnapToIndex = (index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  };

  // Animated style for dynamic paddingTop with smooth interpolation
  const animatedContentStyle = useAnimatedStyle(() => {
    // Calculate actual screen positions
    // 25% of screen = screenHeight * 0.25
    // 60% of screen = screenHeight * 0.60
    // 100% of screen = screenHeight

    const position25 = screenHeight * 0.25;
    const position60 = screenHeight * 0.6;
    const position100 = screenHeight;

    console.log('animatedPosition.value:', animatedPosition.value);
    console.log('Screen positions - 25%:', position25, '60%:', position60, '100%:', position100);

    const paddingTop = interpolate(
      screenHeightAnimated.value - animatedPosition.value,
      [position25, position60, position100], // input range: 25% screen, 60% screen, 100% screen
      [0, 0, 20], // output range: 0px, 0px, 60px
      'clamp',
    );

    console.log('paddingTop:', paddingTop);

    return {
      paddingTop,
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Gorhom Bottom Sheet Example</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleOpenPress}>
            <Text style={styles.buttonText}>Open Bottom Sheet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleClosePress}>
            <Text style={styles.buttonText}>Close Bottom Sheet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => handleSnapToIndex(0)}>
            <Text style={styles.buttonText}>Snap to 25%</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => handleSnapToIndex(1)}>
            <Text style={styles.buttonText}>Snap to 100%</Text>
          </TouchableOpacity>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose
          style={styles.bottomSheet}
          animatedPosition={animatedPosition}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Animated.View style={[{ alignItems: 'center' }, animatedContentStyle]}>
              <Text style={styles.sheetTitle}>🚀 Gorhom Bottom Sheet</Text>
              <Text style={styles.sheetText}>This is a working example of Gorhom Bottom Sheet!</Text>
              <Text style={styles.sheetText}>
                • Swipe up/down to resize • Pull down to close • Use buttons above to control programmatically
              </Text>

              <View style={styles.featureList}>
                <Text style={styles.featureTitle}>Features demonstrated:</Text>
                <Text style={styles.featureItem}>✅ Multiple snap points (25%, 100%)</Text>
                <Text style={styles.featureItem}>✅ Programmatic control</Text>
                <Text style={styles.featureItem}>✅ Pull to close</Text>
                <Text style={styles.featureItem}>✅ Animated paddingTop</Text>
                <Text style={styles.featureItem}>✅ Gesture handling</Text>
              </View>

              <TouchableOpacity
                style={styles.sheetButton}
                onPress={() => console.log('Button pressed in bottom sheet!')}
              >
                <Text style={styles.sheetButtonText}>Action Button</Text>
              </TouchableOpacity>
            </Animated.View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 30,
    color: '#333',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  sheetText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    color: '#666',
    lineHeight: 22,
  },
  featureList: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  featureItem: {
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
    paddingLeft: 8,
  },
  sheetButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
  },
  sheetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'AnimationsHome',
  component: AnimationsHomeScreen,
  options: {
    headerShown: true,
    title: 'Bottom Sheet Demo',
  },
};

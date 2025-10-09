import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../common/components/Button';
import { ScreenNames } from '../../common/navigation';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

export default function AnimationsHomeScreen({ navigation }: ScreenBaseProps): React.ReactElement {
  const features = {
    bottomSheetPaddingTop: true,
    // Add future animation features here
  };

  const renderBottomSheetAnimations = () => {
    if (!features.bottomSheetPaddingTop) {
      return null;
    }
    return (
      <>
        <Button
          title='BottomSheet - PaddingTop Animation'
          onPress={() => {
            navigation.navigate(ScreenNames.BottomSheetPaddingTopAnimation);
          }}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animations Hub</Text>
      <Text style={styles.subtitle}>Explore different animation examples</Text>
      <ScrollView style={styles.scrollView}>{renderBottomSheetAnimations()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scrollView: {
    width: '100%',
  },
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'AnimationsHome',
  component: AnimationsHomeScreen,
  options: {
    headerShown: true,
    title: 'Animations Hub',
  },
};

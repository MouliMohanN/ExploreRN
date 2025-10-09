import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

/**
 * Example new screen demonstrating the auto-discovery pattern
 *
 * To add this screen to the navigation:
 * 1. Create the screen component (this file)
 * 2. Export the screen configuration (see bottom of this file)
 * 3. That's it! The build system automatically discovers it!
 */
export default function ScreenSystemDemoScreen({ navigation }: ScreenBaseProps): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 New Screen Added!</Text>

      <Text style={styles.description}>This screen was added using the new auto-discovery system!</Text>

      <Text style={styles.steps}>
        Steps to add a new screen:
        {'\n'}1. Create your screen component
        {'\n'}2. Export a screen configuration
        {'\n'}3. Done! Build system auto-discovers it! 🚀
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 30,
  },
  steps: {
    fontSize: 16,
    color: '#7f8c8d',
    backgroundColor: '#ecf0f1',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Screen configuration for auto-discovery
// This is all you need to add - the navigation system will automatically pick it up!
export const screenConfig: ScreenConfig = {
  name: 'ScreenSystemDemo',
  component: ScreenSystemDemoScreen,
  options: {
    headerShown: true,
    title: '🆕 Screen System Demo',
    headerStyle: {
      backgroundColor: '#3498db',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
};

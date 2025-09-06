/**
 * Screen Discovery Conventions
 *
 * This file defines the conventions that screens must follow for auto-discovery.
 * The build-time scanner will look for these patterns and generate the registry.
 */

import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ComponentType } from 'react';
import { ScreenBaseProps } from '../types/ScreenBaseProps';

/**
 * Screen configuration interface
 * Each screen file must export a configuration object following this interface
 */
export interface ScreenConfig {
  name: string; // Developer-controlled screen name
  component: ComponentType<ScreenBaseProps>;
  options?: NativeStackNavigationOptions;
  group?: string; // Optional grouping (auto-derived from folder structure)
}

/**
 * File naming conventions:
 * - Screen files must end with 'Screen.tsx' or 'Screen.ts'
 * - Located in src/features/<feature-name>/
 * - Can be nested in subfolders within features
 *
 * Export conventions:
 * - Default export: The React component
 * - Named export 'screenConfig': The ScreenConfig object
 *
 * Example:
 * ```typescript
 * // src/features/auth/LoginScreen.tsx
 *
 * export default function LoginScreen({ navigation }: ScreenBaseProps) {
 *   return <View>...</View>;
 * }
 *
 * export const screenConfig: ScreenConfig = {
 *   name: 'Login',
 *   component: LoginScreen,
 *   options: {
 *     headerShown: false,
 *     title: 'Login',
 *   },
 * };
 * ```
 */

/**
 * Auto-generated registry interface
 * This will be generated at build time
 */
export interface GeneratedScreenRegistry {
  screens: ScreenConfig[];
  screenNames: Record<string, string>;
  screensByGroup: Record<string, ScreenConfig[]>;
}

/**
 * Scanner configuration
 */
export interface ScannerConfig {
  srcDir: string;
  featuresDir: string;
  outputFile: string;
  watchMode: boolean;
}

import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ComponentType } from 'react';
import { ScreenBaseProps } from '../types/ScreenBaseProps';

export interface ScreenConfig {
  name: string;
  component: ComponentType<ScreenBaseProps>;
  options?: NativeStackNavigationOptions;
  group?: string; // Optional grouping for screens
}

export interface ScreenRegistry {
  [screenName: string]: ScreenConfig;
}

export interface FeatureScreens {
  screens: ScreenConfig[];
}

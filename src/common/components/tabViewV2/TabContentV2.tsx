import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { TabContentV2Props } from './typesV2';

export const TabContentV2: React.FC<TabContentV2Props> = ({
  tabs,
  currentIndex,
  contentContainerStyle,
}) => {
  const ActiveComponent = tabs[currentIndex].component;

  return (
    <View style={[styles.contentContainer, contentContainerStyle]}>
      <ActiveComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
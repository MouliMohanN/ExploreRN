import React from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { TabBarMatchParent } from './tabBar/TabBarMatchParent';
import { TabBarScrollable } from './tabBar/TabBarScrollable';
import { TabScreen } from './TabScreen';
import { CarouselTabsProps } from './types';

export const CaruouselTabs: React.FC<CarouselTabsProps> = ({
  tabs,
  tabBarIndicatorStyle,
  tabScreenContainerStyle,

  initialIndex = 0,
  swipeEnabled = true,
  tabBarPosition = 'top',
  tabBarType = 'matchParent',
  tabScreenType = 'PagerView',
  offscreenPageLimit = 1,
  shouldHandleBackPressBehavior = true,

  onPageSelected: onPageSelectedCallback,
}) => {
  const currentIndex = useSharedValue(initialIndex);

  const onTabPress = (index: number) => {
    currentIndex.value = index;
    onPageSelectedCallback?.(index);
  };

  const onPageSelected = (index: number) => {
    currentIndex.value = index;
    onPageSelectedCallback?.(index);
  };

  const renderTabBar = (shouldRender: boolean) => {
    if (shouldRender) {
      const TabBar = tabBarType === 'matchParent' ? TabBarMatchParent : TabBarScrollable;
      return (
        <TabBar
          tabs={tabs}
          currentIndex={currentIndex}
          onTabPress={onTabPress}
          tabIndicatorStyle={tabBarIndicatorStyle}
        />
      );
    }
    return null;
  };

  const renderTabScreen = () => {
    return (
      <TabScreen
        tabs={tabs}
        currentIndex={currentIndex}
        swipeEnabled={swipeEnabled}
        contentContainerStyle={tabScreenContainerStyle}
        onPageSelected={onPageSelected}
      />
    );
  };

  return (
    <>
      {renderTabBar(tabBarPosition === 'top')}
      {renderTabScreen()}
      {renderTabBar(tabBarPosition === 'bottom')}
    </>
  );
};

import React, { useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';
import { TabBarMatchParent } from './tabBar/TabBarMatchParent';
import { TabBarScrollable } from './tabBar/TabBarScrollable';
import { TabScreenGestureHandler } from './tabScreen/TabScreenGestureHandler';
import { TabScreenPagerView } from './tabScreen/TabScreenPagerView';
import { CarouselTabsProps } from './types';

const CarouselTabsWrapper: React.FC<CarouselTabsProps> = ({
  tabs,
  tabBarIndicatorStyle,
  tabScreenContainerStyle,

  initialIndex = 0,
  swipeEnabled = true,
  tabBarPosition = 'top',
  tabBarType = 'scrollable',
  tabScreenType = 'PagerView',
  offscreenPageLimit = 1,

  onPageSelected: onPageSelectedCallback,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const pagerViewRef = useRef<PagerView>(null);

  const onTabPress = (index: number) => {
    setCurrentIndex(index);
    onPageSelectedCallback?.(index);
    if (pagerViewRef.current) {
      pagerViewRef.current.setPage(index);
    }
  };

  const onPageSelected = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
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

  const renderPagerView = () => {
    return (
      <TabScreenPagerView
        tabs={tabs}
        currentIndex={currentIndex}
        swipeEnabled={swipeEnabled}
        contentContainerStyle={tabScreenContainerStyle}
        onPageSelected={onPageSelected}
        pagerViewRef={pagerViewRef}
      />
    );
  };

  const renderGestureHandler = () => {
    return (
      <TabScreenGestureHandler
        tabs={tabs}
        currentIndex={currentIndex}
        swipeEnabled={swipeEnabled}
        offScreenPageLimit={offscreenPageLimit}
        contentContainerStyle={tabScreenContainerStyle}
        onPageSelected={onPageSelected}
      />
    );
  };

  const renderTabScreen = () => {
    if (tabScreenType === 'PagerView') {
      return renderPagerView();
    }
    return renderGestureHandler();
  };

  console.log('CaruouselTabs render');

  return (
    <>
      {renderTabBar(tabBarPosition === 'top')}
      {renderTabScreen()}
      {renderTabBar(tabBarPosition === 'bottom')}
    </>
  );
};

const areEqual = (_prevProps: CarouselTabsProps, _nextProps: CarouselTabsProps) => {
  return (
    // prevProps.tabs === nextProps.tabs &&
    // prevProps.tabBarIndicatorStyle === nextProps.tabBarIndicatorStyle &&
    // prevProps.tabScreenContainerStyle === nextProps.tabScreenContainerStyle &&
    // prevProps.initialIndex === nextProps.initialIndex &&
    // prevProps.swipeEnabled === nextProps.swipeEnabled &&
    // prevProps.tabBarPosition === nextProps.tabBarPosition &&
    // prevProps.tabBarType === nextProps.tabBarType &&
    // prevProps.tabScreenType === nextProps.tabScreenType &&
    // prevProps.offscreenPageLimit === nextProps.offscreenPageLimit &&
    true
  );
};

export const CarouselTabs = React.memo(CarouselTabsWrapper, areEqual);

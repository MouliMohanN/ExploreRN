import { ScreenNames } from '.';
import { CarouselTabsExampleScreen } from '../../features/tabView/CarouselTabsExampleScreen';
import { TabViewReactNavigationScreen } from '../../features/tabView/TabViewReactNavigationScreen';
import { TabViewReanimatedScreen } from '../../features/tabView/TabViewReanimatedScreen';
import { TopTabViewExampleScreenGestureHandler } from '../../features/tabView/TopTabViewExampleScreenGestureHandler';
import { TopTabViewExampleScreenPagerView } from '../../features/tabView/TopTabViewExampleScreenPagerView';

export const TabViewFeatureScreen = {
  TabViewReactNavigation: 'TabViewReactNavigation',
  TabViewReanimated: 'TabViewReanimated',
  TabViewTopPagerView: 'TabViewTopPagerView',
  TabViewTopGuestureHandler: 'TabViewTopGuestureHandler',
  CarouselTabs: 'CarouselTabs',
};

export const TabViewFeatureScreens = [
  {
    name: ScreenNames.TabViewReactNavigation,
    component: TabViewReactNavigationScreen,
    options: {
      headerShown: true,
      title: 'React Navigation TabView',
    },
  },
  {
    name: ScreenNames.TabViewReanimated,
    component: TabViewReanimatedScreen,
    options: {
      headerShown: true,
      title: 'Reanimated TabView',
    },
  },
  {
    name: ScreenNames.TabViewTopPagerView,
    component: TopTabViewExampleScreenPagerView,
    options: {
      headerShown: true,
      title: 'Top TabView',
    },
  },
  {
    name: ScreenNames.TabViewTopGuestureHandler,
    component: TopTabViewExampleScreenGestureHandler,
    options: {
      headerShown: true,
      title: 'Top TabView',
    },
  },
  {
    name: ScreenNames.CarouselTabs,
    component: CarouselTabsExampleScreen,
    options: {
      headerShown: true,
      title: 'Carousel Tabs',
    },
  },
];

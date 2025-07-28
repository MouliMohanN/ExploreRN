import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../../MainScreen';
import { LogContentScreen } from '../../features/logs/LogContentScreen';
import { LogViewerScreen } from '../../features/logs/LogViewerScreen';
import { CarouselTabsExampleScreen } from '../../features/tabView/CarouselTabsExampleScreen';
import { TabViewReactNavigationScreen } from '../../features/tabView/TabViewReactNavigationScreen';
import { TabViewReanimatedScreen } from '../../features/tabView/TabViewReanimatedScreen';
import { TopTabViewExampleScreenGestureHandler } from '../../features/tabView/TopTabViewExampleScreenGestureHandler';
import { TopTabViewExampleScreenPagerView } from '../../features/tabView/TopTabViewExampleScreenPagerView';

const LogFeatureScreen = {
  LogViewer: 'LogViewer',
  LogContent: 'LogContent',
};

const TabViewFeatureScreen = {
  TabViewReactNavigation: 'TabViewReactNavigation',
  TabViewReanimated: 'TabViewReanimated',
  TabViewTopPagerView: 'TabViewTopPagerView',
  TabViewTopGuestureHandler: 'TabViewTopGuestureHandler',
  CarouselTabs: 'CarouselTabs',
};

export const ScreenNames = {
  Main: 'Main',
  ...LogFeatureScreen,
  ...TabViewFeatureScreen,
};

export const RootStack = createNativeStackNavigator();

const LogFeatureScreens = [
  {
    name: ScreenNames.LogViewer,
    component: LogViewerScreen,
    options: {
      headerShown: true,
      title: 'Available Logs',
    },
  },
  {
    name: ScreenNames.LogContent,
    component: LogContentScreen,
    options: {
      headerShown: true,
      title: 'Log Content',
    },
  },
];

const TabViewFeatureScreens = [
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

export const RootStackScreens = [
  {
    name: ScreenNames.Main,
    component: MainScreen,
    options: {
      headerShown: true,
    },
  },
  ...LogFeatureScreens,
  ...TabViewFeatureScreens,
];

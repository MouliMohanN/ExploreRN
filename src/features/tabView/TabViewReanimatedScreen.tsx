import React from 'react';
import { Dimensions, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as TabView from 'reanimated-tab-view';
import { CounterContext, useCounter } from './CounterContext';
import { TabViewScreen1 } from './screens/TabViewScreen1';
import { TabViewScreen2 } from './screens/TabViewScreen2';

const tabs = [
  { key: 'screen1', title: 'Screen 1', component: TabViewScreen1 },
  { key: 'screen2', title: 'Screen 2', component: TabViewScreen2 },
  { key: 'screen3', title: 'Screen 3', component: TabViewScreen1 },
  { key: 'screen4', title: 'Screen 4', component: TabViewScreen2 },
  { key: 'screen5', title: 'Screen 5', component: TabViewScreen1 },
  { key: 'screen6', title: 'Screen 6', component: TabViewScreen2 },
];

export function TabViewReanimatedScreen() {
  const [index, setIndex] = React.useState(0);
  const { count, setCount } = useCounter();

  const routes = tabs.map((tab) => ({ key: tab.key, title: tab.title }));

  const renderScene = ({ route }: { route: { key: string } }) => {
    const tab = tabs.find((t) => t.key === route.key);
    if (tab) {
      const Component = tab.component;
      return (
        <View style={{ flex: 1, backgroundColor: 'white', marginTop: 80 }}>
          <Component />
        </View>
      );
    }
    return null;
  };

  return (
    <GestureHandlerRootView>
      <CounterContext.Provider value={{ count, setCount }}>
        <TabView.TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={(props) => <TabView.TabBar {...props} scrollEnabled />}
        />
      </CounterContext.Provider>
    </GestureHandlerRootView>
  );
}

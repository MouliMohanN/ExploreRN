import { Text, View } from 'react-native';
import { Button } from './common/components/Button';
import { ScreenNames } from './common/navigation';
import { ScreenBaseProps } from './common/types/ScreenBaseProps';
import { logger } from './common/utils/logger/logger';

export const MainScreen: React.FC<ScreenBaseProps> = ({ navigation }) => {
  const features = {
    log: false,
    tabView: false,
    webSockets: false,
    eventBus: false,
    screenSystemDemo: true,
    brotli: true,
  };
  const renderLogFeature = () => {
    if (!features.log) {
      return null;
    }
    return (
      <>
        <Button
          title='Log Info'
          onPress={() => {
            logger.info('Log Info button pressed', { exampleData: 'This is some data' });
            console.log('Log Info button pressed', { exampleData: 'This is some data' });
          }}
        />
        <Button
          title='View Logs'
          onPress={() => {
            navigation.navigate(ScreenNames.LogViewer);
          }}
        />
      </>
    );
  };

  const renderTabViewFeature = () => {
    if (!features.tabView) {
      return null;
    }
    return (
      <>
        <Button
          title='React Navigation TabView'
          onPress={() => {
            navigation.navigate(ScreenNames.TabViewReactNavigation);
          }}
        />
        <Button
          title='Reanimated TabView'
          onPress={() => {
            navigation.navigate(ScreenNames.TabViewReanimated);
          }}
        />
        <Button
          title='Top TabView - ViewPager'
          onPress={() => {
            navigation.navigate(ScreenNames.TabViewTopPagerView);
          }}
        />
        <Button
          title='Top TabView - GuestureHandler'
          onPress={() => {
            navigation.navigate(ScreenNames.TabViewTopGuestureHandler);
          }}
        />
        <Button
          title='Carousel Tabs'
          onPress={() => {
            navigation.navigate(ScreenNames.CarouselTabs);
          }}
        />
      </>
    );
  };

  const renderWebSockets = () => {
    if (!features.webSockets) {
      return null;
    }
    return (
      <>
        <Button
          title='WebSockets'
          onPress={() => {
            navigation.navigate(ScreenNames.WebSockets);
          }}
        />
      </>
    );
  };

  const renderEventBus = () => {
    if (!features.eventBus) {
      return null;
    }
    return (
      <>
        <Button
          title='EventBus'
          onPress={() => {
            navigation.navigate(ScreenNames.EventBus);
          }}
        />
      </>
    );
  };

  const renderScreenSystemDemo = () => {
    if (!features.screenSystemDemo) {
      return null;
    }
    return (
      <>
        <Button
          title='🆕 Screen System Demo'
          onPress={() => {
            navigation.navigate(ScreenNames.ScreenSystemDemo);
          }}
        />
      </>
    );
  };

  const renderBrotli = () => {
    if (!features.brotli) {
      return null;
    }
    return (
      <>
        <Button
          title='Brotli'
          onPress={() => {
            navigation.navigate(ScreenNames.Brotli);
          }}
        />
      </>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
      <Text>Main Screen</Text>
      {renderLogFeature()}
      {renderTabViewFeature()}
      {renderWebSockets()}
      {renderEventBus()}
      {renderScreenSystemDemo()}
      {renderBrotli()}
    </View>
  );
};

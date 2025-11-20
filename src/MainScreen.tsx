import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from './common/components/Button';
import { ScreenNames } from './common/navigation';
import { ScreenBaseProps } from './common/types/ScreenBaseProps';
import { logger } from './common/utils/logger/logger';

export const MainScreen: React.FC<ScreenBaseProps> = ({ navigation }) => {
  const features = {
    log: true,
    tabView: false,
    webSockets: false,
    eventBus: true,
    screenSystemDemo: true,
    react19: true,
    typescript: false,
    inputText: false,
    animations: true,
    nativeModules: true,
    wave: true,
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

  const renderReact19 = () => {
    if (!features.react19) {
      return null;
    }
    return (
      <>
        <Button
          title='React 19'
          onPress={() => {
            navigation.navigate(ScreenNames.React19Home);
          }}
        />
      </>
    );
  };

  const renderTypescript = () => {
    if (!features.typescript) {
      return null;
    }
    return (
      <>
        <Button
          title='Typescript'
          onPress={() => {
            navigation.navigate(ScreenNames.ModernTypeScriptFeatures);
          }}
        />
      </>
    );
  };

  const renderInputText = () => {
    if (!features.inputText) {
      return null;
    }
    return (
      <>
        <Button
          title='Input Text'
          onPress={() => {
            navigation.navigate(ScreenNames.InputText);
          }}
        />
      </>
    );
  };

  const renderAnimations = () => {
    if (!features.animations) {
      return null;
    }

    return (
      <>
        <Button
          title='Animations'
          onPress={() => {
            navigation.navigate(ScreenNames.AnimationsHome);
          }}
        />
      </>
    );
  };

  const renderNativeModules = () => {
    if (!features.nativeModules) {
      return null;
    }
    return (
      <>
        <Button
          title='Native Modules'
          onPress={() => {
            navigation.navigate(ScreenNames.NativeModulesHome);
          }}
        />
      </>
    );
  };

  const renderWave = () => {
    if (!features.wave) {
      return null;
    }
    return (
      <>
        <Button
          title='Wave'
          onPress={() => {
            navigation.navigate(ScreenNames.WaveHome);
          }}
        />
      </>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
      <Text>Main Screen</Text>
      <ScrollView>
        {renderLogFeature()}
        {renderTabViewFeature()}
        {renderWebSockets()}
        {renderEventBus()}
        {renderScreenSystemDemo()}
        {renderReact19()}
        {renderTypescript()}
        {renderInputText()}
        {renderAnimations()}
        {renderNativeModules()}
        {renderWave()}
      </ScrollView>
    </View>
  );
};

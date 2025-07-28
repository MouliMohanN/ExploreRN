import { Text, View } from 'react-native';
import { Button } from './common/components/Button';
import { ScreenNames } from './common/navigation';
import { ScreenBaseProps } from './common/types/ScreenBaseProps';
import { logger } from './common/utils/logger/logger';

export const MainScreen: React.FC<ScreenBaseProps> = ({ navigation }) => {
  const renderLogFeature = () => {
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

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
      <Text>Main Screen</Text>
      {renderLogFeature()}
      {renderTabViewFeature()}
    </View>
  );
};

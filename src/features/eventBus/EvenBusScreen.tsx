import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
const Button = React.lazy(() => import('../../common/components/Button').then(m => ({ default: m.Button })));
import { ScreenConfig } from '../../common/navigation/conventions';
import { AppEventBus } from '../../common/utils/eventBus/EventBus';
import { logger } from '../../common/utils/logger/logger';

const Screen1 = () => {
  const [user, setUser] = React.useState<{ id: number; name: string }>({ id: 0, name: '' });

  useEffect(() => {
    const unsubscribe = AppEventBus.subscribe('user.loggedIn', (user) => {
      logger.info(user);
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <Text>Screen 1: {user.name}</Text>
    </View>
  );
};

export default function EventBusScreen(): React.ReactElement {
  const [count, setCount] = React.useState(0);

  const onPress = () => {
    const newCount = count + 1;
    setCount(newCount);
    AppEventBus.publish('user.loggedIn', { id: 1, name: 'Mouli ' + newCount });
  };

  return (
    <View>
      <Text>EventBusScreen</Text>
      <Screen1 />
      <React.Suspense fallback={<View />}>
        <Button title='Log In' onPress={onPress} />
      </React.Suspense>
    </View>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'EventBus',
  component: EventBusScreen,
  options: {
    headerShown: true,
    title: 'EventBus',
  },
};

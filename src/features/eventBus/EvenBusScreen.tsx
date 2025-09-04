import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ScreenConfig } from '../../common/navigation/conventions';
import { AppEventBus } from '../../common/utils/eventBus/EventBus';
import { Button } from '../../common/components/Button';

const Screen1 = () => {

  const [user, setUser] = React.useState<{ id: number; name: string }>({ id: 0, name: '' });

  useEffect(() => {
    const unsubscribe = AppEventBus.subscribe('user.loggedIn', (user) => {
      console.log(user);
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
}

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
      <Button title='Log In' onPress={onPress} />
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

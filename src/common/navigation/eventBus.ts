import { ScreenNames } from '.';
import { EventBusScreen } from '../../features/eventBus/EvenBusScreen';

export const EventBusFeatureScreen = {
  EventBus: 'EventBus',
};

export const EventBusFeatureScreens = [
  {
    name: ScreenNames.EventBus,
    component: EventBusScreen,
    options: {
      headerShown: true,
      title: 'EventBus',
    },
  },
];

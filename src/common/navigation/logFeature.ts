import { ScreenNames } from '.';
import { LogContentScreen } from '../../features/logs/LogContentScreen';
import { LogViewerScreen } from '../../features/logs/LogViewerScreen';

export const LogFeatureScreen = {
  LogViewer: 'LogViewer',
  LogContent: 'LogContent',
};

export const LogFeatureScreens = [
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

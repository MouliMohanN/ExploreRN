import React, { useEffect } from 'react';
import {RootNavigation} from './navigation';
import { setLoggerConfig } from './common/utils/logger/logger';
import { LogLevel } from './common/utils/logger/types';

const App = () => {

  useEffect(() => { 
    setLoggerConfig({
      logLevel: LogLevel.INFO, // Set the desired log level
      loggers: ['console', 'file', 'network'], // Specify the loggers to use
    });
  }, []);

  return <RootNavigation />;
};

export default App;

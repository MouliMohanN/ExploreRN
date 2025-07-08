import { LogMapper } from '../loggers/Logger';
import { defaultConsoleLoggerConfig } from '../loggers/consoleLogger';
import { defaultFileLoggerConfig } from '../loggers/fileLogger';
import { defaultNetworkLoggerConfig } from '../loggers/networkLogger';
import { LoggerConfig } from '../types/types';

const defaultConfig: LoggerConfig = {
  shouldLog: false, // Default log level
  loggers: ['console', 'file'], // Default to console logging
  loggersConfig: {
    console: { ...defaultConsoleLoggerConfig },
    file: { ...defaultFileLoggerConfig },
    network: { ...defaultNetworkLoggerConfig },
  },
};

export let currentConfig: LoggerConfig = { ...defaultConfig };

export const setLoggerConfig = (newConfig: Partial<LoggerConfig>) => {
  currentConfig = { ...currentConfig, ...newConfig };

  currentConfig.loggers.forEach((loggerName) => {
    const logger = LogMapper[loggerName];
    logger.setConfig?.(currentConfig.loggersConfig?.[loggerName]);
    logger?.cleanUp?.();
  });
};

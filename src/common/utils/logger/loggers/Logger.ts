import { ConsoleLogger } from './consoleLogger';
import { FileLogger } from './fileLogger';
import { NetworkLogger } from './networkLogger';

export type ILogger = {
  info: (message: string, data?: any) => void;
  debug: (message: string, data?: any) => void;
  warn: (message: string, data?: any) => void;
  error: (message: string, data?: any) => void;
  navigationStack: (message: string, data?: any) => void;
  networkIO: (message: string, data?: any) => void;
  redux: (message: string, data?: any) => void;
  setConfig?: (config: any) => void; // Optional method to set logger configuration
  cleanUp?: () => void; // Optional method to clean up resources
};

export const LogMapper: Record<string, ILogger> = {
  console: ConsoleLogger,
  file: FileLogger,
  network: NetworkLogger,
};

export const defaultLogLevelConfig = {
  info: false, // Log INFO level messages
  debug: false, // Do not log DEBUG level messages by default
  warn: false, // Log WARN level messages
  error: false, // Log ERROR level messages
  navigationStack: false, // Do not log navigation stack changes by default
  networkIO: false, // Do not log network I/O operations by default
  redux: false, // Do not log Redux actions and state changes by default
};

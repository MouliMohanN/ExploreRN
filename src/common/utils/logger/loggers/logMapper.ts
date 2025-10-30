import { ConsoleLogger } from './consoleLogger';
import { FileLogger } from './fileLogger';
import { NetworkLogger } from './networkLogger';
import { LoggerContract } from './LoggerContract';

export const LogMapper: Record<string, LoggerContract> = {
  console: ConsoleLogger,
  file: FileLogger,
  network: NetworkLogger,
};

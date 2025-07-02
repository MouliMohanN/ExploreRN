export enum LogLevel {
  INFO = 0,
  DEBUG = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LoggerConfig {
  logLevel: LogLevel;
  loggers: ('console' | 'file' | 'network')[];
}

export type LogFunction = (level: LogLevel, message: string, data?: any) => void;

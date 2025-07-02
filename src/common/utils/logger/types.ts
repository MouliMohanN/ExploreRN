export enum LogLevel {
  INFO = 0,
  DEBUG = 1,
  WARN = 2,
  ERROR = 3,
}

export interface ConsoleLoggerConfig {
  // Add console-specific config here if needed
}

export interface FileLoggerConfig {
  logRetentionHours?: number; // Number of hours to retain log files
}

export interface NetworkLoggerConfig {
  // Add network-specific config here if needed
}

export interface LoggerConfig {
  logLevel: LogLevel;
  loggers: ('console' | 'file' | 'network')[];
  consoleConfig?: ConsoleLoggerConfig;
  fileConfig?: FileLoggerConfig;
  networkConfig?: NetworkLoggerConfig;
}

export type LogFunction = (level: LogLevel, message: string, data?: any) => void;
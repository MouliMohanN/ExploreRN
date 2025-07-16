export type LogLevel = 'info' | 'debug' | 'warn' | 'error' | 'navigationStack' | 'networkIO' | 'redux';

export type LogLevelConfig = {
  info?: boolean; // Whether to log INFO level messages
  debug?: boolean; // Whether to log DEBUG level messages
  warn?: boolean; // Whether to log WARN level messages
  error?: boolean; // Whether to log ERROR level messages
  navigationStack?: boolean; // Whether to log navigation stack changes
  networkIO?: boolean; // Whether to log network I/O operations
  redux?: boolean; // Whether to log Redux actions and state changes
};

export type Loggers = 'console' | 'file' | 'network';

export interface LoggerConfig {
  shouldLog: boolean;
  loggers: Array<Loggers>;
  loggersConfig: {
    console?: ConsoleLoggerConfig;
    file?: FileLoggerConfig;
    network?: NetworkLoggerConfig;
  };
}

export type LogFunction = (level: LogLevelConfig, message: string, data?: any) => void;

// Specific configurations

export interface ConsoleLoggerConfig {
  logLevel?: LogLevelConfig; // Minimum log level to output to console
}

export interface FileLoggerConfig {
  logLevel?: LogLevelConfig; // Minimum log level to write to file
  logRetentionHours?: number; // Number of hours to retain log files
  cleanupDelayMs?: number; // Delay in milliseconds before cleaning old logs
  logSeparator?: string; // Separator between log entries in the file
}

export interface NetworkLoggerConfig {
  logLevel?: LogLevelConfig; // Minimum log level for network logs
}

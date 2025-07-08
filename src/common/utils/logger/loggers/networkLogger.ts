import { NetworkLoggerConfig } from '../types/types';
import { defaultLogLevelConfig, ILogger } from './Logger';

// export const networkLogger = async (level: LogLevelConfig, message: string, data?: any, config?: NetworkLoggerConfig) => {
//   try {
//     const logPayload = {
//       timestamp: new Date().toISOString(),
//       level: LogLevel[level],
//       message,
//       data,
//     };

//     await fetch(NETWORK_LOG_ENDPOINT, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(logPayload),
//     });
//   } catch (error) {
//     console.error('Failed to send log to network:', error);
//   }
// };

export const defaultNetworkLoggerConfig: NetworkLoggerConfig = {
  logLevel: { ...defaultLogLevelConfig },
};

export const NetworkLogger: ILogger = {
  info: async (_message: string, _data?: any) => {
    // TODO: Implement network logging logic
  },
  debug: async (_message: string, _data?: any) => {
    // TODO: Implement network logging logic
  },
  warn: async (_message: string, _data?: any) => {
    // TODO: Implement network logging logic
  },
  error: async (_message: string, _data?: any) => {
    // TODO: Implement network logging logic
  },
  navigationStack: async (_message: string, _data?: any) => {
    // TODO: Implement network logging logic
  },
  networkIO: async (_message: string, _data?: any) => {
    // TODO: Implement network logging logic
  },
  redux: async (_message: string, _data?: any) => {
    // TODO: Implement network logging logic
  },
};

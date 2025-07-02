import { LogLevel, LogFunction } from '../types';

const NETWORK_LOG_ENDPOINT = 'https://your-logging-service.com/log'; // TODO: Replace with your actual logging service endpoint

export const networkLogger: LogFunction = async (level, message, data?) => {
  try {
    const logPayload = {
      timestamp: new Date().toISOString(),
      level: LogLevel[level],
      message,
      data,
    };

    await fetch(NETWORK_LOG_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logPayload),
    });
  } catch (error) {
    console.error('Failed to send log to network:', error);
  }
};
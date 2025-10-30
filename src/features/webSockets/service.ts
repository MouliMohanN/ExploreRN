import { logger } from '../../common/utils/logger/logger';

type WebSocketProps = {
  onopen: () => void;
  onclose: (event: WebSocketCloseEvent) => void;
  onmessage: (event: WebSocketMessageEvent) => void;
  onerror: (event: WebSocketErrorEvent) => void;
};

export const initWebSocket = (url: string, callback: WebSocketProps): WebSocket => {
  const ws = new WebSocket(url);

  logger.info('WebSocket client connecting');
  ws.onopen = () => {
    // connection opened
    callback.onopen();
    logger.info('WebSocket client onOpen');
  };

  ws.onmessage = (e) => {
    // a message was received
    logger.info('onMessage', e.data);
    callback.onmessage(e);
  };

  ws.onerror = (e) => {
    // an error occurred
    logger.info('onError', e.message);
    callback.onerror(e);
  };

  ws.onclose = (e) => {
    // connection closed
    logger.info('onClose', { code: e.code, reason: e.reason });
    callback.onclose(e);
  };

  return ws;
};

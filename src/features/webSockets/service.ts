type WebSocketProps = {
  onopen: () => void;
  onclose: (event: WebSocketCloseEvent) => void;
  onmessage: (event: WebSocketMessageEvent) => void;
  onerror: (event: WebSocketErrorEvent) => void;
};

export const initWebSocket = (url: string, callback: WebSocketProps): WebSocket => {
  const ws = new WebSocket(url);

  console.log('WebSocket client connecting');
  ws.onopen = () => {
    // connection opened
    callback.onopen();
    console.log('WebSocket client onOpen');
  };

  ws.onmessage = (e) => {
    // a message was received
    console.log('onMessage', e.data);
    callback.onmessage(e);
  };

  ws.onerror = (e) => {
    // an error occurred
    console.log('onError', e.message);
    callback.onerror(e);
  };

  ws.onclose = (e) => {
    // connection closed
    console.log('onClose', e.code, e.reason);
    callback.onclose(e);
  };

  return ws;
};

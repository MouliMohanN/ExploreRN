

type WebSocketProps = {
    onopen: () => void;
    onclose: (event: WebSocketCloseEvent) => void;
    onmessage: (event: WebSocketMessageEvent) => void;
    onerror: (event: WebSocketErrorEvent) => void;
};

export const initWebSocket = (url: string = 'ws://host.com/path', callback: WebSocketProps) => {
  const ws = new WebSocket(url);

ws.onopen = () => {
  // connection opened
    ws.send('something'); // send a message
    callback.onopen();
};

ws.onmessage = e => {
  // a message was received
    console.log(e.data);
    callback.onmessage(e);
};

ws.onerror = e => {
  // an error occurred
    console.log(e.message);
    callback.onerror(e);
};

ws.onclose = e => {
  // connection closed
    console.log(e.code, e.reason);
    callback.onclose(e);
};
};
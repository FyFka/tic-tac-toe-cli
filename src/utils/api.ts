import { IMessage, SocketEvents } from "../interfaces/IMessage";
import WebSocket from "ws";
let once = false;

const socket = new WebSocket("wss://tttoe-api.herokuapp.com/:443");
const socketHandlers = new Map<string, Function[]>([]);

setInterval(() => {
  sendMessage({ event: SocketEvents.PING });
}, 25000);

socket.on("message", (evt: WebSocket.RawData) => {
  const rawData = JSON.parse(evt.toString()) as IMessage<unknown>;
  const handlers = socketHandlers.get(rawData.event);
  if (!handlers) {
    return;
  }
  handlers.forEach((handler) => handler(rawData));
});

export const subscribeToEvent = (evt: SocketEvents, handler: Function) => {
  const handlers = socketHandlers.get(evt) || [];
  socketHandlers.set(evt, handlers.concat(handler));
};

export const unsubscribeFromEvent = (evt: SocketEvents, handler: Function) => {
  const handlers = socketHandlers.get(evt) || [];
  socketHandlers.set(
    evt,
    handlers.filter((h) => h !== handler)
  );
};

export const sendMessage = <T>(message: Partial<IMessage<T>>) => {
  const stringifiedMessage = JSON.stringify(message);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
  }
  if (!once) {
    socket.on("open", () => {
      socket.send(stringifiedMessage);
    });
    once = true;
  }
};

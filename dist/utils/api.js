"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.unsubscribeFromEvent = exports.subscribeToEvent = void 0;
const IMessage_1 = require("../interfaces/IMessage");
const ws_1 = __importDefault(require("ws"));
const socket = new ws_1.default("wss://tttoe-api.herokuapp.com/:443");
const socketHandlers = new Map([]);
setInterval(() => {
    (0, exports.sendMessage)({ event: IMessage_1.SocketEvents.PING });
}, 25000);
socket.on("message", (evt) => {
    const rawData = JSON.parse(evt.toString());
    const handlers = socketHandlers.get(rawData.event);
    if (!handlers) {
        return;
    }
    handlers.forEach((handler) => handler(rawData));
});
const subscribeToEvent = (evt, handler) => {
    const handlers = socketHandlers.get(evt) || [];
    socketHandlers.set(evt, handlers.concat(handler));
};
exports.subscribeToEvent = subscribeToEvent;
const unsubscribeFromEvent = (evt, handler) => {
    const handlers = socketHandlers.get(evt) || [];
    socketHandlers.set(evt, handlers.filter((h) => h !== handler));
};
exports.unsubscribeFromEvent = unsubscribeFromEvent;
const sendMessage = (message) => {
    const stringifiedMessage = JSON.stringify(message);
    if (socket.readyState === ws_1.default.OPEN) {
        socket.send(stringifiedMessage);
    }
    socket.on("open", () => {
        socket.send(stringifiedMessage);
    });
    // socket.addEventListener(
    //   "open",
    //   () => {
    //     socket.send(stringifiedMessage);
    //   },
    //   { once: true }
    // );
};
exports.sendMessage = sendMessage;

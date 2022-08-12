"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers = [];
let currentIndex = 0;
const useHandler = () => {
    const subscribe = (handler) => {
        handlers.push(handler);
    };
    const unsubscribe = (handler) => {
        handlers.splice(handlers.indexOf(handler), 1);
    };
    const click = () => {
        const handler = handlers[currentIndex];
        if (handler) {
            handler.onClick();
        }
    };
    return { click, subscribe, unsubscribe };
};
exports.default = useHandler;

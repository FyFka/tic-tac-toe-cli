"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerContextProvider = exports.HandlerContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ink_1 = require("ink");
const react_1 = require("react");
exports.HandlerContext = (0, react_1.createContext)(null);
const HandlerContextProvider = ({ children }) => {
    const { exit } = (0, ink_1.useApp)();
    const [handlers, setHandlers] = (0, react_1.useState)([]);
    const [currentIndex, setCurrentIndex] = (0, react_1.useState)(0);
    const click = () => {
        if (handlers[currentIndex]) {
            handlers[currentIndex].handler();
        }
    };
    const subscribe = (handler) => {
        const handlerId = generateId();
        setHandlers((prevHandlers) => [...prevHandlers, { handler, id: handlerId }]);
        return handlerId;
    };
    const generateId = () => {
        return Math.random().toString().slice(2, 7);
    };
    const unsubscribe = (id) => {
        setHandlers(handlers.filter((h) => h.id !== id));
    };
    (0, ink_1.useInput)((inp, key) => {
        if (inp === "q") {
            exit();
        }
        else if (key.rightArrow || key.downArrow) {
            nextHandler();
        }
        else if (key.leftArrow || key.upArrow) {
            previousHandler();
        }
        else if (key.return) {
            click();
        }
    });
    const nextHandler = () => {
        setCurrentIndex((prevIndex) => (prevIndex === handlers.length - 1 ? 0 : prevIndex + 1));
    };
    const previousHandler = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? handlers.length - 1 : prevIndex - 1));
    };
    return ((0, jsx_runtime_1.jsx)(exports.HandlerContext.Provider, Object.assign({ value: { click, subscribe, unsubscribe, currentIndex, currentHandler: handlers[currentIndex] } }, { children: children })));
};
exports.HandlerContextProvider = HandlerContextProvider;

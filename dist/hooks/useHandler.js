"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Handler_1 = require("../Contexts/Handler");
const useHandler = () => {
    const handlerContext = (0, react_1.useContext)(Handler_1.HandlerContext);
    return {
        click: handlerContext.click,
        subscribe: handlerContext.subscribe,
        unsubscribe: handlerContext.unsubscribe,
        currentIndex: handlerContext.currentIndex,
        currentHandler: handlerContext.currentHandler,
    };
};
exports.default = useHandler;

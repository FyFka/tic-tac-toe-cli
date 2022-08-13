"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ink_1 = require("ink");
const react_1 = require("react");
const useHandler_1 = __importDefault(require("../hooks/useHandler"));
const Button = ({ onClick, activeBorderStyle = "double", children }) => {
    const { subscribe, unsubscribe, currentIndex } = (0, useHandler_1.default)();
    const [controlIndex, setControlIndex] = (0, react_1.useState)(-1);
    (0, react_1.useEffect)(() => {
        let idx = subscribe(onClick);
        setControlIndex(idx);
        return () => {
            unsubscribe(onClick);
        };
    }, []);
    return (0, jsx_runtime_1.jsx)(ink_1.Box, Object.assign({ borderStyle: currentIndex === controlIndex ? activeBorderStyle : "classic" }, { children: children }));
};
exports.default = Button;

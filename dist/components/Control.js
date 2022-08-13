"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ink_1 = require("ink");
const react_1 = require("react");
const useHandler_1 = __importDefault(require("../hooks/useHandler"));
const Control = ({ onClick, children, styles }) => {
    const { subscribe, unsubscribe, currentHandler } = (0, useHandler_1.default)();
    const [controlIndex, setControlIndex] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        const idx = subscribe(onClick);
        setControlIndex(idx);
        return () => {
            unsubscribe(controlIndex);
        };
    }, []);
    const isActive = (currentHandler === null || currentHandler === void 0 ? void 0 : currentHandler.id) === controlIndex;
    return ((0, jsx_runtime_1.jsx)(ink_1.Box, Object.assign({}, styles, { borderStyle: isActive ? "double" : "round", borderColor: isActive ? "white" : "gray" }, { children: children })));
};
exports.default = Control;

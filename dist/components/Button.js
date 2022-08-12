"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ink_1 = require("ink");
const react_1 = require("react");
const useHandler_1 = __importDefault(require("../hooks/useHandler"));
const Button = ({ onClick, onHover, children }) => {
    const { subscribe, unsubscribe } = (0, useHandler_1.default)();
    (0, react_1.useEffect)(() => {
        subscribe({ onClick, onHover });
        return () => {
            unsubscribe({ onClick, onHover });
        };
    }, []);
    return (0, jsx_runtime_1.jsx)(ink_1.Box, { children: children });
};
exports.default = Button;

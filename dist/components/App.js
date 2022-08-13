"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ink_1 = require("ink");
const Handler_1 = require("../Contexts/Handler");
const Header_1 = __importDefault(require("./Header"));
const RoomsTable_1 = __importDefault(require("./RoomsTable"));
const App = () => {
    return ((0, jsx_runtime_1.jsx)(Handler_1.HandlerContextProvider, { children: (0, jsx_runtime_1.jsxs)(ink_1.Box, Object.assign({ margin: 1, display: "flex", flexDirection: "column" }, { children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)(ink_1.Box, Object.assign({ width: "100%", display: "flex", justifyContent: "center", marginBottom: 1 }, { children: (0, jsx_runtime_1.jsx)(ink_1.Text, Object.assign({ color: "magenta", underline: true }, { children: "Use arrow keys to focus the buttons. Press 'q' to exit." })) })), (0, jsx_runtime_1.jsx)(RoomsTable_1.default, {})] })) }));
};
exports.default = App;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ink_1 = require("ink");
const Control_1 = __importDefault(require("./Control"));
const Room = ({ id, name, size, password }) => {
    return ((0, jsx_runtime_1.jsxs)(ink_1.Box, Object.assign({ borderStyle: "single", borderColor: "white", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", flexBasis: "100%" }, { children: [(0, jsx_runtime_1.jsxs)(ink_1.Text, { children: [name, " (", size, "x", size, ")"] }), (0, jsx_runtime_1.jsx)(Control_1.default, Object.assign({ onClick: () => console.log(`JOIN -> ${name}`), styles: { width: "80%", display: "flex", justifyContent: "center" } }, { children: (0, jsx_runtime_1.jsx)(ink_1.Box, { children: (0, jsx_runtime_1.jsx)(ink_1.Text, { children: "JOIN" }) }) }))] })));
};
exports.default = Room;

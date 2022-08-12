"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ink_1 = require("ink");
const Room = ({ id, name, size, password }) => {
    const { isFocused } = (0, ink_1.useFocus)();
    return ((0, jsx_runtime_1.jsxs)(ink_1.Box, Object.assign({ borderStyle: "single", borderColor: "white", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", flexBasis: "100%" }, { children: [(0, jsx_runtime_1.jsxs)(ink_1.Text, { children: [name, " (", size, "x", size, ")"] }), (0, jsx_runtime_1.jsx)(ink_1.Box, Object.assign({ width: "80%", borderStyle: "round", borderColor: isFocused ? "white" : "gray", display: "flex", justifyContent: "center" }, { children: (0, jsx_runtime_1.jsx)(ink_1.Text, Object.assign({ bold: isFocused }, { children: "JOIN" })) }))] })));
};
exports.default = Room;

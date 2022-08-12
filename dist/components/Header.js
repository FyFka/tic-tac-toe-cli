"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ink_1 = require("ink");
const ink_big_text_1 = __importDefault(require("ink-big-text"));
const Header = () => {
    return ((0, jsx_runtime_1.jsx)(ink_1.Box, Object.assign({ width: "100%", paddingBottom: 1, paddingTop: 1, borderStyle: "single" }, { children: (0, jsx_runtime_1.jsx)(ink_big_text_1.default, { align: "center", text: "TIC-TAC-TOE" }) })));
};
exports.default = Header;

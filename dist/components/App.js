"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CreateRoom_1 = __importDefault(require("./CreateRoom"));
const App = () => {
    return (0, jsx_runtime_1.jsx)(CreateRoom_1.default, {});
};
exports.default = App;

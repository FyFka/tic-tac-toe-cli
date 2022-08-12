"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ink_1 = require("ink");
const react_1 = require("react");
const IMessage_1 = require("../interfaces/IMessage");
const api_1 = require("../utils/api");
const Button_1 = __importDefault(require("./Button"));
const Room_1 = __importDefault(require("./Room"));
const RoomsTable = () => {
    const [rooms, setRooms] = (0, react_1.useState)([]);
    const { isFocused } = (0, ink_1.useFocus)();
    (0, react_1.useEffect)(() => {
        (0, api_1.sendMessage)({ event: IMessage_1.SocketEvents.GET_ROOMS });
        (0, api_1.subscribeToEvent)(IMessage_1.SocketEvents.GET_ROOMS, handleGetRooms);
        (0, api_1.subscribeToEvent)(IMessage_1.SocketEvents.ADD_ROOM, handleAddRoom);
        (0, api_1.subscribeToEvent)(IMessage_1.SocketEvents.REMOVE_ROOM, handleRemoveRoom);
        // subscribeToEvent(SocketEvents.JOIN_ROOM_SUCCESS, handleJoinRoomSuccess);
        // subscribeToEvent(SocketEvents.JOIN_ROOM_ERROR, handleJoinRoomError);
        return () => {
            (0, api_1.unsubscribeFromEvent)(IMessage_1.SocketEvents.ADD_ROOM, handleAddRoom);
            (0, api_1.unsubscribeFromEvent)(IMessage_1.SocketEvents.REMOVE_ROOM, handleRemoveRoom);
            (0, api_1.unsubscribeFromEvent)(IMessage_1.SocketEvents.GET_ROOMS, handleGetRooms);
            // unsubscribeFromEvent(SocketEvents.JOIN_ROOM_SUCCESS, handleJoinRoomSuccess);
            // unsubscribeFromEvent(SocketEvents.JOIN_ROOM_ERROR, handleJoinRoomError);
        };
    }, []);
    const handleAddRoom = (0, react_1.useCallback)((message) => {
        setRooms((prevRooms) => [...prevRooms, message.data]);
    }, []);
    const handleGetRooms = (0, react_1.useCallback)((message) => {
        setRooms(message.data);
    }, []);
    const handleRemoveRoom = (0, react_1.useCallback)((message) => {
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== message.data.id));
    }, []);
    // const handleJoinRoomError = useCallback((message: IMessage<{ info: string }>) => {
    //   toast.error(message.data.info);
    // }, []);
    // const handleJoinRoomSuccess = useCallback((message: IMessage<{ id: string }>) => {
    //   navigate("/game/" + message.data.id);
    // }, []);
    return ((0, jsx_runtime_1.jsxs)(ink_1.Box, Object.assign({ display: "flex", flexDirection: "column" }, { children: [(0, jsx_runtime_1.jsx)(ink_1.Text, Object.assign({ bold: true }, { children: "Free rooms" })), (0, jsx_runtime_1.jsx)(ink_1.Box, Object.assign({ width: "100%", display: "flex" }, { children: rooms.map((room) => ((0, jsx_runtime_1.jsx)(Room_1.default, { id: room.id, size: room.size, name: room.name, password: room.password }, room.id))) })), (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ onClick: () => console.log("sss"), onHover: () => console.log("sGGG") }, { children: (0, jsx_runtime_1.jsx)(ink_1.Box, Object.assign({ width: "95%", display: "flex", alignItems: "center", justifyContent: "center", borderStyle: "round", borderColor: isFocused ? "white" : "gray", alignSelf: "center" }, { children: (0, jsx_runtime_1.jsx)(ink_1.Text, Object.assign({ bold: isFocused }, { children: "CREATE ROOM" })) })) }))] })));
};
exports.default = RoomsTable;
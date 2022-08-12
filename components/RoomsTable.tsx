import { Box, Text, useFocus, Spacer, Newline } from "ink";
import SelectInput from "ink-select-input";
import { useCallback, useEffect, useState } from "react";
import { IMessage, SocketEvents } from "../interfaces/IMessage";
import { IRoom } from "../interfaces/IRoom";
import { sendMessage, subscribeToEvent, unsubscribeFromEvent } from "../utils/api";
import Button from "./Button";
import Room from "./Room";

const RoomsTable = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const { isFocused } = useFocus();

  useEffect(() => {
    sendMessage({ event: SocketEvents.GET_ROOMS });
    subscribeToEvent(SocketEvents.GET_ROOMS, handleGetRooms);
    subscribeToEvent(SocketEvents.ADD_ROOM, handleAddRoom);
    subscribeToEvent(SocketEvents.REMOVE_ROOM, handleRemoveRoom);
    // subscribeToEvent(SocketEvents.JOIN_ROOM_SUCCESS, handleJoinRoomSuccess);
    // subscribeToEvent(SocketEvents.JOIN_ROOM_ERROR, handleJoinRoomError);

    return () => {
      unsubscribeFromEvent(SocketEvents.ADD_ROOM, handleAddRoom);
      unsubscribeFromEvent(SocketEvents.REMOVE_ROOM, handleRemoveRoom);
      unsubscribeFromEvent(SocketEvents.GET_ROOMS, handleGetRooms);
      // unsubscribeFromEvent(SocketEvents.JOIN_ROOM_SUCCESS, handleJoinRoomSuccess);
      // unsubscribeFromEvent(SocketEvents.JOIN_ROOM_ERROR, handleJoinRoomError);
    };
  }, []);

  const handleAddRoom = useCallback((message: IMessage<IRoom>) => {
    setRooms((prevRooms) => [...prevRooms, message.data]);
  }, []);

  const handleGetRooms = useCallback((message: IMessage<IRoom[]>) => {
    setRooms(message.data);
  }, []);

  const handleRemoveRoom = useCallback((message: IMessage<{ id: string }>) => {
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== message.data.id));
  }, []);

  // const handleJoinRoomError = useCallback((message: IMessage<{ info: string }>) => {
  //   toast.error(message.data.info);
  // }, []);

  // const handleJoinRoomSuccess = useCallback((message: IMessage<{ id: string }>) => {
  //   navigate("/game/" + message.data.id);
  // }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Text bold>Free rooms</Text>
      <Box width="100%" display="flex">
        {rooms.map((room) => (
          <Room key={room.id} id={room.id} size={room.size} name={room.name} password={room.password} />
        ))}
      </Box>
      <Button onClick={() => console.log("sss")} onHover={() => console.log("sGGG")}>
        <Box
          width="95%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderStyle="round"
          borderColor={isFocused ? "white" : "gray"}
          alignSelf="center"
        >
          <Text bold={isFocused}>CREATE ROOM</Text>
        </Box>
      </Button>
    </Box>
  );
};

export default RoomsTable;

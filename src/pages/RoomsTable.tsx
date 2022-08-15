import { Box, Text } from "ink";
import { useCallback, useEffect, useState } from "react";
import { IMessage, SocketEvents } from "../interfaces/IMessage";
import { IRoom } from "../interfaces/IRoom";
import { sendMessage, subscribeToEvent, unsubscribeFromEvent } from "../utils/api";
import Control from "../components/Control";
import Room from "../components/Room";
import usePage from "../hooks/usePage";

const RoomsTable = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const navigate = usePage();

  useEffect(() => {
    sendMessage({ event: SocketEvents.GET_ROOMS });
    subscribeToEvent(SocketEvents.GET_ROOMS, handleGetRooms);
    subscribeToEvent(SocketEvents.ADD_ROOM, handleAddRoom);
    subscribeToEvent(SocketEvents.REMOVE_ROOM, handleRemoveRoom);
    subscribeToEvent(SocketEvents.JOIN_ROOM_SUCCESS, handleJoinRoomSuccess);
    subscribeToEvent(SocketEvents.JOIN_ROOM_ERROR, handleJoinRoomError);

    return () => {
      unsubscribeFromEvent(SocketEvents.ADD_ROOM, handleAddRoom);
      unsubscribeFromEvent(SocketEvents.REMOVE_ROOM, handleRemoveRoom);
      unsubscribeFromEvent(SocketEvents.GET_ROOMS, handleGetRooms);
      unsubscribeFromEvent(SocketEvents.JOIN_ROOM_SUCCESS, handleJoinRoomSuccess);
      unsubscribeFromEvent(SocketEvents.JOIN_ROOM_ERROR, handleJoinRoomError);
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

  const handleJoinRoomError = useCallback((message: IMessage<{ info: string }>) => {
    console.log(message.data.info);
  }, []);

  const handleJoinRoomSuccess = useCallback((message: IMessage<{ id: string }>) => {
    navigate("/game/" + message.data.id);
  }, []);

  const handleCreateRoom = useCallback(() => {
    navigate("/create-room");
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      <Text bold>Free rooms</Text>
      <Box width="100%" display="flex">
        {rooms.map((room) => (
          <Room key={room.id} id={room.id} size={room.size} name={room.name} password={room.password} />
        ))}
      </Box>
      <Control
        onClick={handleCreateRoom}
        styles={{
          width: "95%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Text>CREATE ROOM</Text>
      </Control>
    </Box>
  );
};

export default RoomsTable;

import { Box } from "ink";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Field from "../components/Field";
import withExternalError, { IWithExternalErrorProps } from "../HOC/withExternalError";
import usePage from "../hooks/usePage";
import { IMessage, SocketEvents } from "../interfaces/IMessage";
import { sendMessage, subscribeToEvent, unsubscribeFromEvent } from "../utils/api";

const JoinPrivateRoom = ({ setExternalError }: IWithExternalErrorProps) => {
  const { gameId } = useParams();
  const navigate = usePage();

  useEffect(() => {
    subscribeToEvent(SocketEvents.JOIN_ROOM_ERROR, handleJoinRoomError);
    subscribeToEvent(SocketEvents.JOIN_ROOM_SUCCESS, handleJoinRoomSuccess);

    return () => {
      unsubscribeFromEvent(SocketEvents.JOIN_ROOM_ERROR, handleJoinRoomError);
      unsubscribeFromEvent(SocketEvents.JOIN_ROOM_SUCCESS, handleJoinRoomSuccess);
    };
  });

  const handleJoinRoomSuccess = useCallback((message: IMessage<{ id: string }>) => {
    navigate("/game/" + message.data.id);
  }, []);

  const handleJoinRoomError = useCallback((message: IMessage<{ info: string }>) => {
    setExternalError(message.data.info);
  }, []);

  const handleJoinRoom = (query: string) => {
    sendMessage({ event: SocketEvents.JOIN_ROOM, data: { id: gameId, password: query } });
  };

  return (
    <Box>
      <Field label="Password" onSubmit={handleJoinRoom} />
    </Box>
  );
};

export default withExternalError(JoinPrivateRoom);

import { Box } from "ink";
import { useCallback, useEffect, useState } from "react";
import Field from "../components/Field";
import usePage from "../hooks/usePage";
import { IMessage, SocketEvents } from "../interfaces/IMessage";
import { sendMessage, subscribeToEvent, unsubscribeFromEvent } from "../utils/api";

enum Stage {
  NAME,
  PASSWORD,
  SIZE,
}

const CreateRoom = () => {
  const [stage, setStage] = useState(Stage.NAME);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = usePage();

  const handleSubmit = (query: string) => {
    if (stage === Stage.NAME) {
      setName(query);
      setStage(Stage.PASSWORD);
    } else if (stage === Stage.PASSWORD) {
      setPassword(query);
      setStage(Stage.SIZE);
    } else if (stage === Stage.SIZE) {
      const size = query;
      handleCreateRoom(name, password, +size);
    }
  };

  useEffect(() => {
    subscribeToEvent(SocketEvents.CREATE_ROOM_ERROR, handleError);
    subscribeToEvent(SocketEvents.CREATE_ROOM_SUCCESS, handleSuccess);

    return () => {
      unsubscribeFromEvent(SocketEvents.CREATE_ROOM_ERROR, handleError);
      unsubscribeFromEvent(SocketEvents.CREATE_ROOM_SUCCESS, handleSuccess);
    };
  });

  const handleSuccess = useCallback((message: IMessage<{ id: string }>) => {
    navigate("/game/" + message.data.id);
  }, []);

  const handleCreateRoom = (name: string, password: string, size: number) => {
    sendMessage({ event: SocketEvents.CREATE_ROOM, data: { name, password, size } });
  };

  const handleError = useCallback((evt: IMessage<{ field: "name" | "size"; info: string }>) => {
    console.log(evt.data);
    setStage(Stage.NAME);
  }, []);

  return (
    <Box>
      {stage === Stage.NAME && <Field label="Room name" onSubmit={handleSubmit} />}
      {stage === Stage.PASSWORD && <Field label="Password(optional)" onSubmit={handleSubmit} />}
      {stage === Stage.SIZE && <Field label="Board size" onSubmit={handleSubmit} initial="3" />}
    </Box>
  );
};

export default CreateRoom;

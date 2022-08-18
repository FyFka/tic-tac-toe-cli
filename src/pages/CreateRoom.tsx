import { Box } from "ink";
import { useCallback, useEffect, useReducer } from "react";
import Field from "../components/Field";
import withExternalError, { IWithExternalErrorProps } from "../HOC/withExternalError";
import usePage from "../hooks/usePage";
import { IMessage, SocketEvents } from "../interfaces/IMessage";
import { sendMessage, subscribeToEvent, unsubscribeFromEvent } from "../utils/api";

enum Stage {
  NAME,
  PASSWORD,
  SIZE,
  RESET,
}

interface IAction {
  type: Stage;
  payload: string;
}

const reducer = (state: { name: string; password: string; size: string; stage: Stage }, action: IAction) => {
  switch (action.type) {
    case Stage.NAME:
      return { ...state, name: action.payload, stage: Stage.PASSWORD };
    case Stage.PASSWORD:
      return { ...state, password: action.payload, stage: Stage.SIZE };
    case Stage.RESET:
      return { name: "", password: "", size: "", stage: Stage.NAME };
    default:
      return state;
  }
};

const CreateRoom = ({ setExternalError }: IWithExternalErrorProps) => {
  const [state, dispatch] = useReducer(reducer, { name: "", password: "", size: "", stage: Stage.NAME });
  const navigate = usePage();

  useEffect(() => {
    subscribeToEvent(SocketEvents.CREATE_ROOM_ERROR, handleError);
    subscribeToEvent(SocketEvents.CREATE_ROOM_SUCCESS, handleSuccess);

    return () => {
      unsubscribeFromEvent(SocketEvents.CREATE_ROOM_ERROR, handleError);
      unsubscribeFromEvent(SocketEvents.CREATE_ROOM_SUCCESS, handleSuccess);
    };
  });

  const handleSubmit = (query: string) => {
    const { stage, name, password } = state;
    dispatch({ type: stage, payload: query });
    if (state.stage === Stage.SIZE) {
      handleCreateRoom(name, password, +query);
    }
  };

  const handleSuccess = useCallback((message: IMessage<{ id: string }>) => {
    navigate("/game/" + message.data.id);
  }, []);

  const handleCreateRoom = (name: string, password: string, size: number) => {
    sendMessage({ event: SocketEvents.CREATE_ROOM, data: { name, password, size } });
  };

  const handleError = useCallback((evt: IMessage<{ field: "name" | "size"; info: string }>) => {
    setExternalError(evt.data.info);
    dispatch({ type: Stage.RESET, payload: "" });
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      {state.stage === Stage.NAME && <Field label="Room name" onSubmit={handleSubmit} />}
      {state.stage === Stage.PASSWORD && <Field label="Password(optional)" onSubmit={handleSubmit} />}
      {state.stage === Stage.SIZE && <Field label="Board size" onSubmit={handleSubmit} initial="3" />}
    </Box>
  );
};

export default withExternalError(CreateRoom);

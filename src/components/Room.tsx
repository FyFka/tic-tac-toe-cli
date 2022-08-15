import { Box, Text } from "ink";
import { SocketEvents } from "../interfaces/IMessage";

import { IRoom } from "../interfaces/IRoom";
import { sendMessage } from "../utils/api";
import Control from "./Control";

interface IRoomProps extends IRoom {}

const Room = ({ id, name, size, password }: IRoomProps) => {
  const handleJoinRoom = () => {
    if (!password) {
      sendMessage({ event: SocketEvents.JOIN_ROOM, data: { id } });
    } else {
      // dispatch({ type: ActionType.OPEN_MODAL, payload: { body: <JoinRoom id={id} />, title: "Join Room" } });
    }
  };

  return (
    <Box
      borderStyle="single"
      borderColor="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      flexBasis="100%"
    >
      <Text>
        {password && "[ PRIVATE ]"} {name} ({size}x{size})
      </Text>
      <Control onClick={handleJoinRoom} styles={{ width: "80%", display: "flex", justifyContent: "center" }}>
        <Box>
          <Text>JOIN</Text>
        </Box>
      </Control>
    </Box>
  );
};

export default Room;

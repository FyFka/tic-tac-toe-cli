import { Box, Text, useFocus } from "ink";

import { IRoom } from "../interfaces/IRoom";
import Control from "./Control";

interface IRoomProps extends IRoom {}

const Room = ({ id, name, size, password }: IRoomProps) => {
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
        {name} ({size}x{size})
      </Text>
      <Control
        onClick={() => console.log(`JOIN -> ${name}`)}
        styles={{ width: "80%", display: "flex", justifyContent: "center" }}
      >
        <Box>
          <Text>JOIN</Text>
        </Box>
      </Control>
    </Box>
  );
};

export default Room;

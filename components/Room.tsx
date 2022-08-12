import { Box, Text, useFocus } from "ink";

import { IRoom } from "../interfaces/IRoom";

interface IRoomProps extends IRoom {}

const Room = ({ id, name, size, password }: IRoomProps) => {
  const { isFocused } = useFocus();

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
      <Box
        width="80%"
        borderStyle="round"
        borderColor={isFocused ? "white" : "gray"}
        display="flex"
        justifyContent="center"
      >
        <Text bold={isFocused}>JOIN</Text>
      </Box>
    </Box>
  );
};

export default Room;

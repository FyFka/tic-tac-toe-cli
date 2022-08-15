import { Box, Text } from "ink";
import { useLocation } from "react-router-dom";
import Control from "../components/Control";
import BigText from "ink-big-text";
import usePage from "../hooks/usePage";
import { socketHandlers } from "../utils/api";

const GameResult = () => {
  const { state } = useLocation();
  const navigate = usePage();

  const handleBack = () => {
    console.log(socketHandlers.size);
    navigate("/");
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box width="100%">
        <Text>GAME RESULT</Text>
      </Box>
      <Box width="100%">
        <BigText align="center" text={state as string} />
      </Box>
      <Control
        onClick={handleBack}
        styles={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Back to main menu</Text>
      </Control>
    </Box>
  );
};

export default GameResult;

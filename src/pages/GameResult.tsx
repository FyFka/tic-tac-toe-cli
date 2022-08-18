import { Box, Text } from "ink";
import { useLocation } from "react-router-dom";
import Control from "../components/Control";
import BigText from "ink-big-text";
import usePage from "../hooks/usePage";
import Gradient from "ink-gradient";

const GameResult = () => {
  const { state } = useLocation();
  const navigate = usePage();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box width="100%">
        <Text>GAME RESULT</Text>
      </Box>
      <Box width="100%">
        <Gradient name="mind">
          <BigText align="center" text={state as string} />
        </Gradient>
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

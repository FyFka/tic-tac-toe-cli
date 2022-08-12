import { Box } from "ink";
import BigText from "ink-big-text";

const Header = () => {
  return (
    <Box width="100%" paddingBottom={1} paddingTop={1} borderStyle="single">
      <BigText align="center" text="TIC-TAC-TOE" />
    </Box>
  );
};

export default Header;

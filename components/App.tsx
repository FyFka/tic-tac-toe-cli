import { Box, Text } from "ink";
import { HandlerContextProvider } from "../Contexts/Handler";
import Header from "./Header";
import RoomsTable from "./RoomsTable";

const App = () => {
  return (
    <HandlerContextProvider>
      <Box margin={1} display="flex" flexDirection="column">
        <Header />
        <Box width="100%" display="flex" justifyContent="center" marginBottom={1}>
          <Text color="magenta" underline>
            Use arrow keys to focus the buttons. Press 'q' to exit.
          </Text>
        </Box>
        <RoomsTable />
      </Box>
    </HandlerContextProvider>
  );
};

export default App;

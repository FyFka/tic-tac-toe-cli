import { Box, Text } from "ink";
import { HandlerContextProvider } from "../Contexts/Handler";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import Header from "./Header";
import RoomsTable from "./RoomsTable";
import CreateRoom from "./CreateRoom";

const App = () => {
  return (
    <HandlerContextProvider>
      <Box margin={1} display="flex" flexDirection="column">
        <MemoryRouter>
          <Header />
          <Box width="100%" display="flex" justifyContent="center" marginBottom={1}>
            <Text color="magenta" underline>
              Use arrow keys to focus the buttons. Press 'q' to exit.
            </Text>
          </Box>
          <Routes>
            <Route path="/" element={<RoomsTable />} />
            <Route path="/create-room" element={<CreateRoom />} />
          </Routes>
        </MemoryRouter>
      </Box>
    </HandlerContextProvider>
  );
};

export default App;

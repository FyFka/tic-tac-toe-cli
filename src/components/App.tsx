import { Box, Text } from "ink";
import { HandlerContextProvider } from "../contexts/Handler";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import Header from "./Header";
import RoomsTable from "../pages/RoomsTable";
import CreateRoom from "../pages/CreateRoom";
import Game from "../pages/Game";
import GameResult from "../pages/GameResult";
import JoinPrivateRoom from "../pages/JoinPrivateRoom";

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
            <Route path="/game/:id" element={<Game />} />
            <Route path="/game-result" element={<GameResult />} />
            <Route path="/join-private-room/:gameId" element={<JoinPrivateRoom />} />
          </Routes>
        </MemoryRouter>
      </Box>
    </HandlerContextProvider>
  );
};

export default App;

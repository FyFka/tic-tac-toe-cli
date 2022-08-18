import { Box, Text } from "ink";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Control from "../components/Control";
import withExternalError, { IWithExternalErrorProps } from "../HOC/withExternalError";
import usePage from "../hooks/usePage";
import { GameResult } from "../interfaces/IGameResult";
import { GameSymbol } from "../interfaces/IGameSymbol";
import { IMessage, SocketEvents } from "../interfaces/IMessage";
import { sendMessage, subscribeToEvent, unsubscribeFromEvent } from "../utils/api";

const Game = ({ setExternalError }: IWithExternalErrorProps) => {
  const [board, setBoard] = useState<string[][]>([[]]);
  const [myTurn, setMyTurn] = useState(false);
  const sizeRef = useRef<number>(0);
  const symbolRef = useRef<GameSymbol>(GameSymbol.UNKNOWN);
  const navigate = usePage();
  const { id } = useParams();

  useEffect(() => {
    sendMessage({ event: SocketEvents.CAN_PLAY, data: { id } });
    subscribeToEvent(SocketEvents.CAN_PLAY_ERROR, handleCanPlayError);
    subscribeToEvent(SocketEvents.CAN_PLAY_SUCCESS, handleCanPlaySuccess);
    subscribeToEvent(SocketEvents.TURN_ERROR, handleTurnError);
    subscribeToEvent(SocketEvents.SYMBOL, handleSetSymbol);
    subscribeToEvent(SocketEvents.TURN, handleTurn);
    subscribeToEvent(SocketEvents.GAME_RESULT, handleGameResult);

    return () => {
      unsubscribeFromEvent(SocketEvents.CAN_PLAY_ERROR, handleCanPlayError);
      unsubscribeFromEvent(SocketEvents.CAN_PLAY_SUCCESS, handleCanPlaySuccess);
      unsubscribeFromEvent(SocketEvents.TURN_ERROR, handleTurnError);
      unsubscribeFromEvent(SocketEvents.SYMBOL, handleSetSymbol);
      unsubscribeFromEvent(SocketEvents.TURN, handleTurn);
      unsubscribeFromEvent(SocketEvents.GAME_RESULT, handleGameResult);
    };
  }, []);

  const handleGameResult = useCallback((message: IMessage<GameResult>) => {
    if (message.data === GameResult.DRAW) {
      navigate("/game-result", { state: "Draw!" });
    } else if (
      (message.data === GameResult.X_WON && symbolRef.current === GameSymbol.X) ||
      (message.data === GameResult.O_WON && symbolRef.current === GameSymbol.O)
    ) {
      navigate("/game-result", { state: "You won!" });
    } else {
      navigate("/game-result", { state: "You lost!" });
    }
  }, []);

  const handleTurnError = useCallback((message: IMessage<{ info: string }>) => {
    setExternalError(message.data.info);
  }, []);

  const handleTurn = useCallback((message: IMessage<{ board: string[][]; turn: GameSymbol }>) => {
    setBoard(message.data.board);
    if (message.data.turn === symbolRef.current) {
      setMyTurn(true);
    }
  }, []);

  const handleSetSymbol = useCallback((message: IMessage<{ player: GameSymbol }>) => {
    symbolRef.current = message.data.player;
    if (message.data.player === GameSymbol.X) {
      setMyTurn(true);
    }
  }, []);

  const handleCanPlaySuccess = useCallback((message: IMessage<{ size: number }>) => {
    sizeRef.current = message.data.size;
    setBoard(new Array(message.data.size).fill(new Array(message.data.size).fill("")));
  }, []);

  const handleCanPlayError = useCallback(() => {
    navigate("/");
  }, []);

  const handlePick = (row: number, cell: number) => {
    if (board[row][cell] !== "" || symbolRef.current === GameSymbol.UNKNOWN) return;
    setMyTurn(false);
    sendMessage({ event: SocketEvents.PICK, data: { id, row, cell } });
  };

  const pickCurry = (row: number, cell: number) => {
    return () => {
      handlePick(row, cell);
    };
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box width="100%">
        <Text bold>Game ({id})</Text>
      </Box>
      <Box width="100%">
        <Text>{symbolRef.current === GameSymbol.UNKNOWN ? "Waiting..." : myTurn ? "Your turn" : "Enemy turn"}</Text>
      </Box>
      <Box display="flex" width="100%" flexDirection="column" justifyContent="center" alignItems="center">
        {board.map((row, rowIndex) => (
          <Box key={rowIndex} width="100%" justifyContent="center" alignItems="center">
            {row.map((cell, cellIndex) => (
              <Control
                styles={{
                  width: "100%",
                  height: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={cellIndex}
                onClick={pickCurry(rowIndex, cellIndex)}
              >
                <Text bold>{cell}</Text>
              </Control>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default withExternalError(Game);

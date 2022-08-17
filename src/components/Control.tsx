import { Box } from "ink";
import { useEffect, useState } from "react";
import useHandler from "../hooks/useHandler";
import { Styles } from "ink/build/styles";

interface IControlProps {
  onClick: () => void;
  children: React.ReactNode;
  styles?: Omit<Styles, "borderStyle" | "borderColor">;
}

const Control = ({ onClick, children, styles }: IControlProps) => {
  const { subscribe, unsubscribe, currentHandler } = useHandler();
  const [controlIndex, setControlIndex] = useState("");

  useEffect(() => {
    const idx = subscribe(onClick);
    setControlIndex(idx);

    return () => {
      unsubscribe(idx);
    };
  }, []);

  const isActive = currentHandler?.id === controlIndex;
  return (
    <Box {...styles} borderStyle={isActive ? "double" : "round"} borderColor={isActive ? "white" : "gray"}>
      {children}
    </Box>
  );
};

export default Control;

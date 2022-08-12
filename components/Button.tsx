import { Box } from "ink";
import { useEffect } from "react";
import useHandler from "../hooks/useHandler";

interface IButtonProps {
  onClick: (data: any) => any;
  onHover: (data: any) => any;
  children?: React.ReactNode;
}

const Button = ({ onClick, onHover, children }: IButtonProps) => {
  const { subscribe, unsubscribe } = useHandler();

  useEffect(() => {
    subscribe({ onClick, onHover });

    return () => {
      unsubscribe({ onClick, onHover });
    };
  }, []);

  return <Box>{children}</Box>;
};

export default Button;

import { useApp, useInput } from "ink";
import { createContext, useEffect, useState } from "react";

export interface IHandlerContext {
  readonly subscribe: (handler: IHandler) => void;
  readonly unsubscribe: (handler: IHandler) => void;
  readonly click: () => void;
}

export interface IHandler {
  onHover: Function;
  onClick: Function;
}

export const HandlerContext = createContext<IHandlerContext>(null!);

interface IHandlerContextProviderProps {
  children: React.ReactNode;
}

export const HandlerContextProvider = ({ children }: IHandlerContextProviderProps) => {
  const { exit } = useApp();
  const [handlers, setHandlers] = useState<IHandler[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const click = () => {
    handlers[currentIndex].onClick();
  };

  const subscribe = (handler: IHandler) => {
    setHandlers([...handlers, handler]);
  };

  const unsubscribe = (handler: IHandler) => {
    console.log("unsubscribe");
  };

  useInput((inp, key) => {
    if (inp === "q") {
      exit();
    } else if (key.rightArrow || key.upArrow) {
      nextHandler();
    } else if (key.leftArrow || key.downArrow) {
      previousHandler();
    }
  });

  const nextHandler = () => {
    setCurrentIndex((prevIndex) => (prevIndex === handlers.length - 1 ? 0 : prevIndex + 1));
  };

  const previousHandler = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? handlers.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    nextHandler();
  }, []);

  return <HandlerContext.Provider value={{ click, subscribe, unsubscribe }}>{children}</HandlerContext.Provider>;
};

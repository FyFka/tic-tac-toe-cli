import { useApp, useInput } from "ink";
import { createContext, useState } from "react";

export interface IHandlerContext {
  readonly subscribe: (handler: Function) => string;
  readonly unsubscribe: (id: string) => void;
  readonly click: () => void;
  readonly currentIndex: number;
  readonly currentHandler: IHandler | undefined;
  readonly resetFocus: () => void;
}

interface IHandler {
  readonly handler: Function;
  readonly id: string;
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
    if (handlers[currentIndex]) {
      handlers[currentIndex].handler();
    }
  };

  const subscribe = (handler: Function) => {
    const handlerId = generateId();
    setHandlers((prevHandlers) => [...prevHandlers, { handler, id: handlerId }]);

    return handlerId;
  };

  const generateId = () => {
    return Math.random().toString().slice(2, 7);
  };

  const unsubscribe = (id: string) => {
    setHandlers(handlers.filter((h) => h.id !== id));
  };

  useInput((inp, key) => {
    if (inp === "q") {
      exit();
    } else if (key.rightArrow || key.downArrow) {
      nextHandler();
    } else if (key.leftArrow || key.upArrow) {
      previousHandler();
    } else if (key.return) {
      click();
    }
  });

  const nextHandler = () => {
    console.log(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex === handlers.length - 1 ? 0 : prevIndex + 1));
  };

  const previousHandler = () => {
    console.log(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? handlers.length - 1 : prevIndex - 1));
  };

  const resetFocus = () => {
    setCurrentIndex(0);
  };

  return (
    <HandlerContext.Provider
      value={{ click, subscribe, unsubscribe, currentIndex, currentHandler: handlers[currentIndex], resetFocus }}
    >
      {children}
    </HandlerContext.Provider>
  );
};

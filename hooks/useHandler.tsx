import { useContext } from "react";
import { HandlerContext } from "../Contexts/Handler";

const useHandler = () => {
  const handlerContext = useContext(HandlerContext);

  return {
    click: handlerContext.click,
    subscribe: handlerContext.subscribe,
    unsubscribe: handlerContext.unsubscribe,
    currentIndex: handlerContext.currentIndex,
    currentHandler: handlerContext.currentHandler,
  };
};

export default useHandler;

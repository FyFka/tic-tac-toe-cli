import { useContext } from "react";
import { HandlerContext } from "../Contexts/Handler";

const handlers: { onHover: Function; onClick: Function }[] = [];
let currentIndex = 0;

const useHandler = () => {
  const handlerContext = useContext(HandlerContext);

  // const subscribe = (handler: { onHover: Function; onClick: Function }) => {
  //   handlers.push(handler);
  // };

  // const unsubscribe = (handler: { onHover: Function; onClick: Function }) => {
  //   handlers.splice(handlers.indexOf(handler), 1);
  // };

  // const click = () => {
  //   const handler = handlers[currentIndex];
  //   if (handler) {
  //     handler.onClick();
  //   }
  // };

  return { click: handlerContext.click, subscribe: handlerContext.subscribe, unsubscribe: handlerContext.unsubscribe };
};

export default useHandler;

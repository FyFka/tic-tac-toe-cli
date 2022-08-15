import { useContext } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { HandlerContext } from "../contexts/Handler";

const usePage = () => {
  const { resetFocus } = useContext(HandlerContext);
  const navigator = useNavigate();

  const navigate = (to: string, options?: NavigateOptions) => {
    resetFocus();
    navigator(to, options);
  };

  return navigate;
};

export default usePage;

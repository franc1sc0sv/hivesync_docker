import { useContext } from "react";
import { DmContext } from "./ContextDM";

export const useDM = () => {
  const context = useContext(DmContext);
  return { ...context };
};

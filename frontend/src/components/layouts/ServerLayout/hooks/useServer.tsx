import { useContext } from "react";
import { ServerContext } from "../Context/ServerContext";

export const useServer = () => {
  const context = useContext(ServerContext);
  return { ...context };
};

import { useContext } from "react";
import { ChatContextChannel } from "./ChatContextChannel";

export const useChat = () => {
  const context = useContext(ChatContextChannel);
  return { ...context };
};

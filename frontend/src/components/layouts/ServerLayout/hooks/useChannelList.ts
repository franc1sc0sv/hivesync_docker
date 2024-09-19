import { useContext } from "react";
import { ChannelListContext } from "../Context/ChannelListContext";

export const useChannelList = () => {
  const context = useContext(ChannelListContext);
  return { ...context };
};

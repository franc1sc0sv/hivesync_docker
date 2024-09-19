import { ReactNode, createContext, useEffect, useState } from "react";
import { useFetchID } from "../../../../hooks/useFecthID";

import { LoadingPage } from "../../../routes/loadingPage";
import { get_all_messages } from "../../../../api/channel";
import { useSocketContext } from "../../../../context/useSocket";

import notificationSound from "/public/sounds/sound.mp3";
import { useSession } from "../../../../store/user";
import { ChannelType } from "../../ServerLayout/types/server";
import { useChannelList } from "../../ServerLayout/hooks/useChannelList";
import { addMessageToGroupedMessages } from "../utils/format_messages_channels";

interface ChatContextProps {
  channel: ChannelType | null;
  messages: GroupedMessagesTypeArray;
  setMessages: React.Dispatch<React.SetStateAction<GroupedMessagesTypeArray>>;
  send_message: (datos: any) => any;
}

export const ChatContextChannel = createContext<ChatContextProps>({
  channel: null,
  messages: [],
  setMessages: () => {},
  send_message: () => {},
});

export const ChatProviderChannel = ({ children }: { children: ReactNode }) => {
  const { socket } = useSocketContext();
  const { user } = useSession();

  const { actualChannel } = useChannelList();
  const [messages, setMessages] = useState<GroupedMessagesTypeArray>([]);

  const { fecthData: fecthDataMessages, isLoading: isLoadingMessages } =
    useFetchID({
      api_function: get_all_messages,
    });

  useEffect(() => {
    const fetcher = async () => {
      const messages = await fecthDataMessages(actualChannel?.id as string);
      setMessages(messages);
    };
    fetcher();
  }, []);

  useEffect(() => {
    const roomId = actualChannel?.id;

    if (socket && roomId) {
      socket.emit("join_room", roomId);
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = async (newMessage: any) => {
      if (user?.id !== newMessage.id_sender) {
        const sound = new Audio(notificationSound);
        sound.volume = 0.1;
        sound
          .play()
          .catch((error) => console.error("Error playing sound:", error));

        const newdata = addMessageToGroupedMessages({
          messages: messages,
          newMessage: newMessage,
        });

        setMessages(newdata);
      }
    };

    socket.on("receive_message", handleNewMessage);
  }, [socket, messages]);

  const send_message = (data: any) => {
    if (!socket) return;
    socket.emit("send_message", { data }, (newMessage: any) => {
      const newdata = addMessageToGroupedMessages({
        messages: messages,
        newMessage: newMessage.newMessage,
      });
      setMessages(newdata);
    });
  };

  if (isLoadingMessages) return <LoadingPage />;
  return (
    <ChatContextChannel.Provider
      value={{
        send_message,
        messages,
        channel: actualChannel,
        setMessages,
      }}
    >
      {children}
    </ChatContextChannel.Provider>
  );
};

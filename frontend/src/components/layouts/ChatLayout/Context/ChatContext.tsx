import { ReactNode, createContext, useEffect, useState } from "react";
import { useFetchID } from "../../../../hooks/useFecthID";
import { get_friend_data } from "../../../../api/user_info";
import { LoadingPage } from "../../../routes/loadingPage";
import { useNavigate } from "react-router-dom";
import { get_all_messages } from "../../../../api/channel";
import { useSocketContext } from "../../../../context/useSocket";

import notificationSound from "/public/sounds/sound.mp3";
import { useSession } from "../../../../store/user";
import { addMessageToGroupedMessages } from "../../ChannelsLayout/utils/format_messages_channels";

interface ChatContextProps {
  friend: UserInfoChat;
  setFriend: React.Dispatch<React.SetStateAction<UserInfoChat>>;

  messages: GroupedMessagesTypeArray;
  setMessages: React.Dispatch<React.SetStateAction<GroupedMessagesTypeArray>>;

  send_message: (datos: any) => any;
}

const user_data: UserInfoChat = {
  about: "",
  backgroundUrl: "",
  createdAt: "",
  id_friendship: "",
  id_user: "",
  name: "",
  profileUrl: "",
  username: "",
};

const get_id = () => {
  const currentUrl = window.location.href;
  const urlParts = currentUrl.split("/");
  const extractedId = urlParts[urlParts.length - 1];

  return extractedId;
};

export const ChatContext = createContext<ChatContextProps>({
  friend: user_data,
  setFriend: () => {},

  messages: [],
  setMessages: () => {},

  send_message: () => {},
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { socket } = useSocketContext();

  const [friend, setFriend] = useState<UserInfoChat>(user_data);
  const [messages, setMessages] = useState<GroupedMessagesTypeArray>([]);

  const { fecthData, isLoading } = useFetchID({
    api_function: get_friend_data,
  });

  const { user } = useSession();

  const { fecthData: fecthDataMessages, isLoading: isLoadingMessages } =
    useFetchID({
      api_function: get_all_messages,
    });

  const navigate = useNavigate();

  useEffect(() => {
    const fetcher = async () => {
      try {
        const id_friend = get_id();
        const friend = await fecthData(id_friend);

        const messages = await fecthDataMessages(friend.id_friendship);
        setMessages(messages);
        setFriend(friend);
      } catch (e) {
        navigate("/app/@me");
      }
    };
    fetcher();
  }, []);

  useEffect(() => {
    const roomId = friend.id_friendship;

    if (socket && roomId) {
      socket.emit("join_room", roomId);
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    console.log("afwff");
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

  if (isLoading || friend.id_friendship === "" || isLoadingMessages)
    return <LoadingPage />;
  return (
    <ChatContext.Provider
      value={{
        friend,
        messages,
        setFriend,
        setMessages,
        send_message,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

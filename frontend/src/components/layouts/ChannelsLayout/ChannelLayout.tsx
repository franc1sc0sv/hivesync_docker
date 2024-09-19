import { SocketContextProvider } from "../../../context/useSocket";
import { Notifications } from "../../Alerts/Notification";

import { Conversation } from "./Components/Conversation/conversation";
import { MessageInput } from "./Components/messageInput";
import { ChatProviderChannel } from "./Context/ChatContextChannel";

export const ChannelLayout = () => {
  return (
    <main className="flex flex-col justify-between w-full h-fll bg-overlay_1">
      <SocketContextProvider namespace="chat">
        <ChatProviderChannel>
          <Conversation />
          <MessageInput />

          <Notifications />
        </ChatProviderChannel>
      </SocketContextProvider>
    </main>
  );
};

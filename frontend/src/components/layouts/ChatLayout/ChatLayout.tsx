import { SocketContextProvider } from "../../../context/useSocket";
import { Notifications } from "../../Alerts/Notification";
import { ShowFakePages } from "../../fakePages/ShowFakePages";

import { Conversation } from "./Components/Conversation/conversation";
import { ChatHeader } from "./Components/Header/chatHeader";
import { MessageInput } from "./Components/messageInput";
import { ChatProvider } from "./Context/ChatContext";

export const ChatLayout = () => {
  return (
    <main className="flex flex-col justify-between w-full h-screen bg-overlay_1">
      <SocketContextProvider namespace="chat">
        <ChatProvider>
          <ChatHeader />
          <Conversation />
          <MessageInput />

          <ShowFakePages showArrow={false} />
          <Notifications />
        </ChatProvider>
      </SocketContextProvider>
    </main>
  );
};

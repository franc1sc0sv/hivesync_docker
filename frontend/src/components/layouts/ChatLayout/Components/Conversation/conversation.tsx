import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Notifications } from "../../../../Alerts/Notification";
import { useChat } from "../../Context/useChat";
import { UserAvatar } from "../../../../Avatars/UserAvatar";
import { useSession } from "../../../../../store/user";

import { formatDateMessage } from "../../../../../helpers/date";

export const Conversation = () => {
  const { messages } = useChat();

  const a = messages.length ? "gap-5" : "";
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`flex flex-col w-full h-full px-5 overflow-y-auto ${a}`}>
      <Notifications />
      <StartConvsersation />
      <ContainerMessages endOfMessagesRef={endOfMessagesRef} />
    </div>
  );
};

const StartConvsersation = () => {
  const { friend } = useChat();

  return (
    <div className="flex flex-col w-full gap-3 mt-6">
      <UserAvatar profileURl={friend.profileUrl} username={friend.username} />
      <div className="flex flex-col gap-1">
        <p className="text-4xl text-white font-amiko">{friend.name}</p>
        <p className="text-lg text-gray font-amiko">{friend.username}</p>
        <p className="text-sm text-gray font-amiko">
          Este es el principio de tu épica conversación con {friend.username}
        </p>
      </div>
    </div>
  );
};

const ContainerMessages = ({
  endOfMessagesRef,
}: {
  endOfMessagesRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const { messages } = useChat();

  const a = messages.length ? "h-full" : "";
  return (
    <div className={`flex flex-col w-full gap-5 ${a}`}>
      {messages.map((group, i) => (
        <GroupOfMessages key={i} group={group} />
      ))}
      <div ref={endOfMessagesRef}></div>
    </div>
  );
};

const GroupOfMessages = ({ group }: { group: GroupedMessagesType }) => {
  const { id_user, messages, sendAt } = group;
  const { friend } = useChat();
  const { user } = useSession();

  const profile_url_user = user?.profileUrl;
  const username_user = user?.username;

  const profile_url_friend = friend.profileUrl;
  const username_friend = friend.username;

  const isFromCurrentUserTheMessage = id_user === user?.id;

  const alignmentClass = isFromCurrentUserTheMessage
    ? "flex-row-reverse items-start text-right" // Mensajes del usuario a la derecha
    : "flex-row items-start text-left"; // Mensajes del amigo a la izquierda

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`flex w-full gap-2 ${alignmentClass}`} // Aplicar la clase de alineación
      >
        <UserAvatar
          fontSize={2}
          w={3}
          h={3}
          username={
            isFromCurrentUserTheMessage
              ? (username_user as string)
              : (username_friend as string)
          }
          profileURl={
            isFromCurrentUserTheMessage
              ? (profile_url_user as string)
              : (profile_url_friend as string)
          }
        />
        <div className="flex flex-col">
          <div className="flex items-end gap-2">
            <p className="font-bold text-white">
              {isFromCurrentUserTheMessage
                ? (username_user as string)
                : (username_friend as string)}
            </p>
            <p className="text-xs font-light text-gray">
              {formatDateMessage(sendAt)}
            </p>
          </div>
          <div className="p-2 rounded-lg ">
            {messages.map((message, i) => (
              <Message message={message} key={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Message = ({ message }: { message: MessageFormated }) => {
  return (
    <p className="text-sm text-white opacity-90 font-extralight">
      {message.message}
    </p>
  );
};

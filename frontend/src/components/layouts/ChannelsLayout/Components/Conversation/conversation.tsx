import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Notifications } from "../../../../Alerts/Notification";
import { useChat } from "../../Context/useChat";
import { UserAvatar } from "../../../../Avatars/UserAvatar";
import { useSession } from "../../../../../store/user";

import { formatDateMessage } from "../../../../../helpers/date";
import { HiHashtag } from "react-icons/hi";

export const Conversation = () => {
  const { messages } = useChat();

  const a = messages.length ? "gap-5" : "";
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`flex flex-col w-full h-full px-5 justify-end overflow-y-auto ${a}`}
    >
      <Notifications />
      <StartConvsersation />
      <ContainerMessages endOfMessagesRef={endOfMessagesRef} />
    </div>
  );
};

const StartConvsersation = () => {
  const { channel } = useChat();

  return (
    <div className="flex flex-col items-start w-full gap-4">
      <div className="p-2 rounded-full bg-gray">
        <HiHashtag color="white" size={36} />
      </div>
      <div className="flex flex-col items-start gap-1">
        <p className="text-4xl font-extrabold text-white font-amiko">
          {channel?.name}
        </p>
        <p className="text-sm text-gray font-amiko">
          Este es el principio del canal {channel?.name}
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
  const { id_user, messages, sendAt, user: external_user } = group;
  const { user } = useSession();
  const profile_url_user = user?.profileUrl;
  const username_user = user?.username;

  const profile_url_user_external = external_user.profileUrl ?? "";
  const username_user_external = external_user.username ?? "";

  const isFromCurrentUserTheMessage = id_user === user?.id;

  const alignmentClass = isFromCurrentUserTheMessage
    ? "flex-row-reverse items-start text-right"
    : "flex-row items-start text-left";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`flex w-full  gap-2 ${alignmentClass}`}
      >
        <UserAvatar
          fontSize={2}
          w={3}
          h={3}
          username={
            isFromCurrentUserTheMessage
              ? (username_user as string)
              : username_user_external
          }
          profileURl={
            isFromCurrentUserTheMessage
              ? (profile_url_user as string)
              : profile_url_user_external
          }
        />
        <div className="flex flex-col">
          <div className="flex items-end gap-2">
            <p className="font-bold text-white">
              {isFromCurrentUserTheMessage
                ? (username_user as string)
                : username_user_external}
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

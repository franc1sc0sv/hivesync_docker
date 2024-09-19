import { useDM } from "../Context/useDM";
import { InboxMessage } from "./InboxMessage";
import { BiMessageX } from "react-icons/bi";

export const Inbox = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col w-full h-full gap-3 overflow-y-auto">
        <FriendsChats />
      </div>
    </div>
  );
};

const FriendsChats = () => {
  const { friends } = useDM();

  if (!friends || friends.length === 0) {
    return <NoChats />;
  }

  return friends?.map((friend, index) => (
    <InboxMessage friend={friend} key={index} />
  ));
};

const NoChats = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-10">
      <BiMessageX color="#fff" size={50} />
      <p className="text-2xl text-custom_white text-center">
        Aún no tienes amigos disponibles para chatear. ¡Buen momento para hacer nuevos!
      </p>
    </div>
  )
}

import { MdPersonAdd } from "react-icons/md";
import { useModal } from "../../../../../store/useModal";
import { ChatIcon } from "../../../../Icons/chat";
import { PhoneIcon } from "../../../../Icons/phone";
import { UserAvatar } from "../../../../Avatars/UserAvatar";
import { useFormData } from "../../../../../hooks/useFormData";
import { create_friend_request } from "../../../../../api/social";

export const UserBox = ({
  avatarURL,
  username,
  isFromFriends = false,
  id = "",
}: {
  avatarURL: string;
  username: string;
  isFromFriends?: boolean;
  id?: string;
}) => {
  const { setModalId } = useModal();

  const modal_id = isFromFriends ? "profilePublic" : "externalProfile";
  return (
    <div className="flex flex-row items-center justify-between w-full px-5 py-3 my-2 rounded-xl bg-overlay_2">
      <div
        className="flex flex-row items-center gap-5 rounded-2xl"
        onClick={() => setModalId(modal_id)}
      >
        <UserAvatar
          profileURl={avatarURL}
          w={4}
          h={4}
          fontSize={2}
          username={username}
        />
        <p className="text-xl text-custom_white font-almarai">{username}</p>
      </div>

      {isFromFriends ? <AddFriendIcon id={id} /> : <IconsCallChat />}
    </div>
  );
};

const IconsCallChat = () => {
  return (
    <div className="flex flex-row gap-5">
      <ChatIcon size={32} color="white" />
      <PhoneIcon size={32} color="white" />
    </div>
  );
};

const AddFriendIcon = ({ id }: { id: string }) => {
  const handleClick = async () => {
    const data = {
      WhoReciveTheRequest: id,
    };
    await create_friend_request(data);
  };

  const { onSubmit } = useFormData({
    api_function: handleClick,
    showSuccesNoti: true,
  });

  return <MdPersonAdd onClick={onSubmit} size={32} color="white" />;
};

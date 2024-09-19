import { MdPersonAdd } from "react-icons/md";
import { useModal } from "../../../../store/useModal";
import { useFormData } from "../../../../hooks/useFormData";
import { UserAvatar } from "../../../Avatars/UserAvatar";
import { create_invitation_server } from "../../../../api/server";

export const UserBoxMembers = ({
  avatarURL,
  username,
  isFromFriends = false,
  id = "",
  id_user = "",
}: {
  avatarURL: string;
  username: string;
  isFromFriends?: boolean;
  id: string;
  id_user: string;
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

      <AddServerIcon id={id} id_user={id_user} />
    </div>
  );
};

const AddServerIcon = ({ id, id_user }: { id: string; id_user: string }) => {
  const handleClick = async () => {
    const data = {
      id_user: id_user,
      role: "USER",
    };

    await create_invitation_server(data, id);
  };

  const { onSubmit } = useFormData({
    api_function: handleClick,
    showSuccesNoti: true,
  });

  return <MdPersonAdd onClick={onSubmit} size={32} color="white" />;
};

import { UserAvatar } from "../../../../components/Avatars/UserAvatar";
import { Link } from "react-router-dom";

interface UserProps {
  friend: FriendWithUserInfo;
}

export const InboxMessage: React.FC<UserProps> = ({ friend }) => {
  const { messagePreview, timeAgo, userInfo } = friend;

  const { username, id_user, profileUrl } = userInfo;

  const message =
    messagePreview === ""
      ? `Has clcik aqui y comienza a hablar con ${username}`
      : messagePreview;
  return (
    <Link
      to={`/app/${id_user}`}
      className="flex justify-around w-full gap-4 h-18"
    >
      <div>
        <UserAvatar
          w={4}
          h={4}
          fontSize={2}
          profileURl={profileUrl}
          username={username}
        />
      </div>
      <div className="flex flex-col w-full font-amiko">
        <h1 className="text-lg text-custom_white">{username}</h1>
        <p className="text-sm text-gray">{message}</p>
      </div>

      <h2 className="self-end text-sm text-right text-gray">{timeAgo}</h2>
    </Link>
  );
};

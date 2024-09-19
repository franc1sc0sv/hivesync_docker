import { useSession } from "../../../../store/user";

import { useCall } from "../Context/useCall";

import { AiOutlineAudioMuted } from "react-icons/ai";
import { UserCameraStream } from "./userCameraStream";

const UserCard = () => {
  const { user } = useSession();
  const {
    mediaStream,
    localVideoRef,
    isTalking,
    isMicrophoneActive,
    isCameraActive,
  } = useCall();

  const border_talking =
    isTalking && isMicrophoneActive
      ? "border-2 border-green"
      : "border-2 border-transparent";

  const PENDING_STYLES_BG = isCameraActive ? "" : user?.backgroundUrl;

  return (
    <div
      style={{ backgroundColor: PENDING_STYLES_BG }}
      className={`w-full max-w-xs h-full  max-h-[320px] rounded-2xl duration-100 ease-in-out transition-all flex items-center justify-center  relative ${border_talking}   `}
    >
      <UserCameraStream
        isMicrofoneOn={isMicrophoneActive}
        videoRef={localVideoRef}
        profileUrl={user?.profileUrl as string}
        username={user?.username as string}
        stream={mediaStream}
        isCameraOn={isCameraActive}
      />
      <p className="absolute pl-2 pr-2 mb-2 ml-2 text-white rounded-md left-2 2t-1 bottom-1 pb- bg-overlay_2 opacity-90">
        {user?.username}
      </p>
    </div>
  );
};

const UserCardFriend = () => {
  const {
    remoteStream,
    friend,
    remoteVideoRef,
    status,
    isUserTalkingRemote,
    isCameraActiveRemote,
    isMicrophoneActiveRemote,
  } = useCall();

  console.log();

  const PENDING_STYLES = status?.status === "PENDING" ? "opacity-50" : "";
  const PENDING_STYLES_BG =
    status?.status === "PENDING" || isCameraActiveRemote
      ? ""
      : friend.backgroundUrl;

  const borderTalking =
    isUserTalkingRemote && isMicrophoneActiveRemote
      ? "animate-pulse border-4 border-green"
      : "border-2 border-transparent";

  const currentUser = status?.participants?.filter(
    (participant) => participant.userId === friend.id_user
  );
  const isCurrentUserActive =
    !isMicrophoneActiveRemote && currentUser?.length !== 0;

  return (
    <div
      style={{ backgroundColor: PENDING_STYLES_BG }}
      className={`w-full max-w-xs h-full max-h-[320px] rounded-2xl flex items-center justify-center relative ${PENDING_STYLES} ${borderTalking}`}
    >
      <UserCameraStream
        isMicrofoneOn={isMicrophoneActiveRemote}
        isCameraOn={isCameraActiveRemote}
        videoRef={remoteVideoRef}
        profileUrl={friend.profileUrl}
        username={friend.username}
        stream={remoteStream}
      />

      <p className="absolute pt-1 pb-1 pl-2 pr-2 mb-2 ml-2 text-white rounded-md left-2 bottom-2 bg-overlay_2 opacity-90">
        {friend.username}
      </p>

      {isCurrentUserActive && (
        <div className="absolute grid p-2 rounded-full bg-gray place-items-center bottom-2">
          <AiOutlineAudioMuted size={16} />
        </div>
      )}
    </div>
  );
};

export const UsersCalls = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-8 md:flex-row">
      <UserCardFriend />
      <UserCard />
    </div>
  );
};

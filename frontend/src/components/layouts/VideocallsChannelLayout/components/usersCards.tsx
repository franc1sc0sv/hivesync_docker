import { AiOutlineAudioMuted } from "react-icons/ai";
import { useSession } from "../../../../store/user";
import { CallParticipantsParams } from "../Context/CallContextChannel";

import { useCall } from "../Context/useCallChannel";

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

const UserCardExternal = ({
  participant,
}: {
  participant: CallParticipantsParams;
}) => {
  const { user: current_user } = useSession();

  const { callControls, isUserTalking, user, userId, mediaStream, videoRef } =
    participant;

  const { IsCameraActive, isMicrofoneActive } = callControls;
  const { backgroundUrl, username, profileUrl } = user;

  const borderTalking =
    isUserTalking && isMicrofoneActive
      ? "animate-pulse border-4 border-green"
      : "border-2 border-transparent";

  const isCurrentUserActive =
    !isMicrofoneActive && !(current_user?.id === userId);

  if (userId === current_user?.id) return <></>;

  return (
    <div
      style={{ backgroundColor: backgroundUrl }}
      className={`w-full max-w-xs h-full max-h-[320px] rounded-2xl flex items-center justify-center relative ${borderTalking}`}
    >
      <UserCameraStream
        isMicrofoneOn={isMicrofoneActive}
        isCameraOn={IsCameraActive}
        videoRef={videoRef as React.RefObject<HTMLVideoElement>}
        profileUrl={profileUrl}
        username={username}
        stream={mediaStream}
      />

      <p className="absolute pt-1 pb-1 pl-2 pr-2 mb-2 ml-2 text-white rounded-md left-2 bottom-2 bg-overlay_2 opacity-90">
        {username}
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
      <CallParticipantContainer />
      <UserCard />
    </div>
  );
};

const CallParticipantContainer = () => {
  const { CallParticipants } = useCall();

  return CallParticipants.map((participant, i) => {
    return <UserCardExternal key={i} participant={participant} />;
  });
};

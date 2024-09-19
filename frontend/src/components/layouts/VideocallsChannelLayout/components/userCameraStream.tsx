import { UserAvatar } from "../../../Avatars/UserAvatar";

type Props = {
  username: string;
  profileUrl: string;
  stream: MediaStream | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  isCameraOn: boolean;
  isMicrofoneOn: boolean;
};

export const UserCameraStream: React.FC<Props> = ({
  username,
  profileUrl,
  stream,
  videoRef,
  isCameraOn,
  isMicrofoneOn,
}) => {
  const showCameraComponent = Boolean(stream && isCameraOn);
  const showMicrfoneComponent = Boolean(stream && !isCameraOn && isMicrofoneOn);
  const showAvatarComponent = !isCameraOn && !isMicrofoneOn;

  return (
    <>
      {showCameraComponent && <VideoAndAudioComponent videoRef={videoRef} />}
      {showMicrfoneComponent && (
        <OnlyAudioComponent
          profileUrl={profileUrl}
          username={username}
          videoRef={videoRef}
        />
      )}
      {showAvatarComponent && (
        <UserAvatar username={username} profileURl={profileUrl} />
      )}
    </>
  );
};

const VideoAndAudioComponent = ({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {
  console.log("a");
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="absolute top-0 left-0 object-cover w-full h-full rounded-xl"
    />
  );
};
const OnlyAudioComponent = ({
  profileUrl,
  username,
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  username: string;
  profileUrl: string;
}) => {
  return (
    <>
      <audio autoPlay playsInline ref={videoRef}></audio>
      <UserAvatar username={username} profileURl={profileUrl} />
    </>
  );
};

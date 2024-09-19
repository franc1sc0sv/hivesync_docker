import { Link } from "react-router-dom";

import { GoBackTriangle } from "../../../../Icons/goBackTriangle";
import { PhoneIcon } from "../../../../Icons/phone";
import { WebCameraIcon } from "../../../../Icons/webCamera";
import { ButtonHover } from "../../../../buttons/hoverButton";

import useFakePages from "../../../../../store/useFakePage";
import useVerifyCallType from "../../../../../store/chat/useVerifyCall";
import { VideoCallLayout } from "../../../VideocallLayout/VideocallLayout";
import { useChat } from "../../Context/useChat";
import { UserAvatar } from "../../../../Avatars/UserAvatar";

export const ChatHeader = () => {
  const { addFakePage } = useFakePages();
  const { setIsVoiceCall } = useVerifyCallType();

  const { friend } = useChat();

  const StartCall = () => {
    addFakePage({
      title: "Llamada en curso",
      children: <VideoCallLayout />,
    });
  };

  const handleVoiceCall = () => {
    setIsVoiceCall(true);
    StartCall();
  };

  const handleVideoCall = () => {
    setIsVoiceCall(false);
    StartCall();
  };

  return (
    <div className="flex items-center justify-between w-full gap-2 px-5 py-3">
      <div className="flex items-center gap-5 w-[70%]">
        <Link to="/app/@me">
          <GoBackTriangle size={24} color="#fff" />
        </Link>
        <div className="flex items-center w-full gap-2 !truncate">
          <div className="w-max">
            <UserAvatar
              w={3}
              h={3}
              fontSize={1.5}
              profileURl={friend?.profileUrl}
              username={friend?.username}
            />
          </div>
          <div className="w-full ">
            <p className="w-full text-xl font-amiko text-custom_white">
              {friend.username}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-5">
        <ButtonHover handleClick={handleVoiceCall}>
          <PhoneIcon size={30} color="#fff" />
        </ButtonHover>

        <ButtonHover handleClick={handleVideoCall}>
          <WebCameraIcon size={30} color="#fff" />
        </ButtonHover>
      </div>
    </div>
  );
};

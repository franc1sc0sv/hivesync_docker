//icons
import { FiCamera } from "react-icons/fi";
import { MdCallEnd } from "react-icons/md";
import { PiMicrophoneFill, PiMicrophoneSlashFill } from "react-icons/pi";
import { FiCameraOff } from "react-icons/fi";

import { Notifications } from "../../../Alerts/Notification";

import { ButtonCallsProps } from "../ButtonCallProps";
import { ButtonCalls } from "./button";
import { BUTTON_TYPE } from "../enum";

import { useNotifications } from "../../../../store/useNotifications";
import useFakePages from "../../../../store/useFakePage";
import { useCall } from "../Context/useCallChannel";

export const VideoCallControlls: React.FC = () => {
  const { setNotifications } = useNotifications();
  const { removeFakePage, fakePages } = useFakePages();
  const { endCall } = useCall();

  const { isCameraActive, isMicrophoneActive, toggleAudio, toggleVideo } =
    useCall();

  const lastPageId =
    fakePages.length > 0 ? fakePages[fakePages.length - 1].id : null;

  const controlls: ButtonCallsProps[] = [
    {
      Icon: isMicrophoneActive ? PiMicrophoneFill : PiMicrophoneSlashFill,
      onClick: toggleAudio,
      type: BUTTON_TYPE.MICROPHONE,
    },
    {
      Icon: isCameraActive ? FiCamera : FiCameraOff,
      onClick: toggleVideo,
      type: BUTTON_TYPE.CAMERA,
    },
    // {
    //   Icon: isShareScreenActive ? MdCancelPresentation : MdCoPresent,
    //   onClick: () => {},
    //   type: BUTTON_TYPE.PRESENTATION,
    // },
    {
      Icon: MdCallEnd,
      onClick: async () => {
        endCall();
        if (lastPageId !== null) {
          removeFakePage(lastPageId);
        }

        setNotifications({
          severity: "info",
          message: "Llamada finalizada",
        });
      },
      type: BUTTON_TYPE.HANG_UP,
    },
  ];

  return (
    <div className="z-10 flex items-center justify-center w-full h-20 gap-3 rounded-2xl bg-overlay_2">
      {controlls.map((controll, i) => (
        <ButtonCalls
          key={i}
          Icon={controll.Icon}
          onClick={controll.onClick}
          type={controll.type}
        />
      ))}
      <Notifications />
    </div>
  );
};

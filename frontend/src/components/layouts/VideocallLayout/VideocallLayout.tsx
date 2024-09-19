import { VideoCallControlls } from "./components/videocallControls";
import { UsersCalls } from "./components/usersCards";
import { CallProvider } from "./Context/CallContext";
import { SocketContextProvider } from "../../../context/useSocket";

export const VideoCallLayout = () => {
  return (
    <SocketContextProvider namespace="call">
      <CallProvider>
        <Interface />
      </CallProvider>
    </SocketContextProvider>
  );
};

const Interface = () => {
  return (
    <div className="flex flex-col items-center justify-between w-screen h-full gap-10 p-5 overflow-y-auto text-white bg-overlay_1 ">
      <UsersCalls />
      <VideoCallControlls />
    </div>
  );
};

import { HiHashtag } from "react-icons/hi2";
import { HiMicrophone } from "react-icons/hi";
import { useChannelList } from "../../../hooks/useChannelList";

export const TopChannelBar = () => {
  const { actualChannel } = useChannelList();

  const icon = actualChannel ? (
    actualChannel.type === "TEXT" ? (
      <HiHashtag className="mr-2 text-2xl" />
    ) : (
      <HiMicrophone className="mr-2 text-2xl" />
    )
  ) : null;

  const channelName = actualChannel
    ? actualChannel.name
    : "No channel selected";

  return (
    <div className="flex items-center justify-center w-full h-full ">
      <div className="flex items-center mb-4 text-white">
        {icon}
        <h2 className="text-xl font-semibold">{channelName}</h2>
      </div>
    </div>
  );
};

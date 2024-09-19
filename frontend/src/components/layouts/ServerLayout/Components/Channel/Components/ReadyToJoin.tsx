import { useChannelList } from "../../../hooks/useChannelList";
import useFakePages from "../../../../../../store/useFakePage";

import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useChannelID } from "../../../hooks/useChannelID";
import { VideoChannelServer } from "./ChannelsLayouts/VideoChannelServer";
import { useModal } from "../../../../../../store/useModal";

export function ReadyToJoin() {
  const { setCurrentChannel } = useChannelList();
  const { channelData } = useChannelID();
  const { addFakePage } = useFakePages();
  const { setModalId } = useModal();

  const handleClick = () => {
    setModalId("");
    setCurrentChannel(channelData?.id as string, true);
    addFakePage({
      title: channelData?.name,
      children: <VideoChannelServer />,
    });
  };
  return (
    <section className="flex flex-col items-center justify-center w-full h-full text-white bg-gray-900">
      <article className="flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-primary to-light_purple">
          <HiMiniSpeakerWave size={50} color={"#ffffff"} />
        </div>
        <h2 className="text-xl font-semibold">{channelData?.name}</h2>
        <p>¿Estas seguro de ingresar a este canal?</p>
        <p className="w-3/4 text-sm text-center text-gray-400">
          Cuando lo tengas todo listo para hablar, entra sin más.
        </p>
      </article>
      <div className="flex justify-between bg-gray-900 rounded-full flex-center">
        <article className="flex items-center justify-center w-full mt-4 space-x-1">
          <div
            className="flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded-xl bg-primary"
            onClick={handleClick}
          >
            <p>Unirme al canal de voz</p>
          </div>
        </article>
      </div>
    </section>
  );
}

import { ChannelType } from "../types/server";
import { useModal } from "../../../../store/useModal";
import useFakePages from "../../../../store/useFakePage";
import { useChannelList } from "./useChannelList";
import { useChannelID } from "./useChannelID";

const CHANNEL_TYPE_TEXT = "TEXT";
const CHANNEL_TYPE_VIDEO = "VIDEO";

interface HandleChannelTypeParams {
  channelToCompare: ChannelType | null;
  childrenFakePage: React.ReactNode;
}

export const useHandleChannelType = ({
  channelToCompare,
  childrenFakePage,
}: HandleChannelTypeParams) => {
  const { addFakePage, fakePages } = useFakePages();
  const { setModalId } = useModal();
  const { setCurrentChannel } = useChannelList();
  const { setChannelID } = useChannelID();

  //averiguamos que tipo de coso es para ejecutar que hook para renderizarle
  const handleModal = () => {
    if (!channelToCompare) return;

    if (channelToCompare.type === CHANNEL_TYPE_TEXT) {
      setCurrentChannel(channelToCompare.id);

      const pageExists = fakePages.some(
        (page) => page.title === "" && page.children === childrenFakePage
      );

      if (!pageExists) {
        childrenFakePage &&
          addFakePage({
            title: channelToCompare.name,
            children: childrenFakePage,
          });
      }
    } else if (channelToCompare.type === CHANNEL_TYPE_VIDEO) {
      setChannelID({ id: channelToCompare.id, name: channelToCompare.name });
      setModalId("JoinVideoCall");
    }
  };

  return handleModal;
};

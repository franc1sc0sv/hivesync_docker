import { ShowFakePages } from "../../../../fakePages/ShowFakePages";
import { useSwipeHandler } from "../../hooks/useFakePageSwipeHandler";
import { useChannelList } from "../../hooks/useChannelList";
import { useHandleChannelType } from "../../hooks/useHandleChannels";
import { MegaphoneIcon } from "../../../../Icons/megaphone";
import { VideoChannelServer } from "./Components/ChannelsLayouts/VideoChannelServer";
import { TextChannelServer } from "./Components/ChannelsLayouts/TextChannelServer";

export const Channel: React.FC = () => {
  const { actualChannel } = useChannelList();

  function* modalGenerator() {
    yield handleModal();
  }

  const handleModal = useHandleChannelType({
    channelToCompare: actualChannel,
    childrenFakePage:
      actualChannel?.type === "VIDEO" ? (
        <VideoChannelServer />
      ) : (
        <TextChannelServer />
      ),
  });

  const modalGenInstance = modalGenerator();

  const handler = useSwipeHandler({
    onSwipedLeft: () => {
      const { done } = modalGenInstance.next();
      if (done) {
        console.log("Modal action already executed.");
      }
    },
  });

  return (
    <div className="flex flex-row items-center justify-center w-[100%] rounded-tl-lg rounded-bl-lg bg-overlay_2 ">
      <div
        {...handler}
        className="w-full ml-auto rounded-tl-lg rounded-bl-lg bg-overlay_2 screen_overlay"
        onClick={() => {
          const { done } = modalGenInstance.next();
          if (done) {
            console.log("Modal action already executed.");
          }
        }}
      ></div>
      <ShowFakePages showArrow={!(actualChannel?.type === "VIDEO")} />
    </div>
  );
};

export const NoChannelSelected: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full gap-6 p-4 rounded-overlay ">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center gap-5 p-4 rounded-lg justify-evenly">
          <MegaphoneIcon size={60} color="#fff" />
          <h1 className="text-3xl text-center text-custom_white font-almarai">
            No te quedes en silencio
          </h1>
          <p className="text-xl text-center text-custom_white">
            Selecciona un canal de texto o voz y únete a la charla
          </p>
        </div>
      </div>
    </section>
  );
};

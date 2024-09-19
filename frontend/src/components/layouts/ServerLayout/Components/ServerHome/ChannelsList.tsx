import { useChannelList } from "../../hooks/useChannelList";
import { AcordeonItems, AcordeonMenu } from "./AcordeonMenu/AcordeonIndex";
import { ChannelCategory } from "../../Enums/SpecificServer";
import { ServerFeaturesAccordion } from "./AcordeonMenu/featuresAcordeon";
import { features } from "./AcordeonMenu/serverFeatures";
import { ChannelVideocallsModal } from "../../../../modals/serverModals/channel/ChannelVideocallsModal";


export const ChannelList = () => {
  const { channelList } = useChannelList();


  return (
    <article className="flex flex-col gap-5 overflow-y-auto">
      <ServerFeaturesAccordion name="Herramientas Hivesync" channels={features()} />
      {channelList.map((channel) => {
        return channel.category === ChannelCategory.NO_CATEGORY ? (
          <AcordeonItems
            CategoryChannel={channel.channels}
            key={channel.category}
          />
        ) : (
          <AcordeonMenu key={channel.category} CategoryChannel={channel} />
        );
      })}
    <ChannelVideocallsModal/>
    </article>
  );
};
                        
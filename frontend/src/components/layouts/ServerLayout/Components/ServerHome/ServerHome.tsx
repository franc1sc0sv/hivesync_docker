import { ServerModals } from "../../../../modals/serverModals/serverModals";
import { SpecificServerType } from "../../types/server";
import { ChannelList } from "./ChannelsList";
import { HeaderServer } from "./HeaderServer";

// SpecificServer

export const ServerHome = ({
  specific_server_data,
}: {
  specific_server_data: SpecificServerType;
}) => {
  return (
    <section className="h-full w-[70%] bg-overlay_2 rounded-overlay p-4 gap-5 flex flex-col ">
      <HeaderServer name={specific_server_data.name} />
      <ChannelList />
      <ServerModals />
    </section>
  );
};

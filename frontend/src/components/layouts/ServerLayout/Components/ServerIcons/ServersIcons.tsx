import { CreateServerModal } from "../../../../modals/serverModals/createServerModal";
import { CreateServerIcon } from "./CreateServerIcon";
import { ServerFolder } from "./ServerFolder";
import { ServerIcon } from "./ServerIcon";
// import { CommunityButton } from "../../../GeneralLayout/buttons/Comunitybutton";
import { useServer } from "../../hooks/useServer";

type PropsServerIcons = {
  server_data_icons: ServerDataIcons;
};

export const ServerIcons: React.FC<PropsServerIcons> = ({
  server_data_icons,
}) => {
  // const { setShouldFetch } = useServer();
  // setShouldFetch(true);
  return (
    <section className="h-[95vh] gap-4 py-4 overflow-y-auto min-w-20 w-[20%] max-w-28 bg-overlay_2 rounded-overlay">
      <div className="flex flex-col items-center gap-3 ">
        <Icons server_data_icons={server_data_icons} />
        <CreateServerIcon />
        {/* <CommunityButton /> */}
      </div>
      <CreateServerModal />
    </section>
  );
};

const Icons: React.FC<PropsServerIcons> = ({ server_data_icons }) => {
  return server_data_icons.map((server, i) => {
    return !Array.isArray(server) ? (
      <ServerIcon
        privacity={server.privacity}
        createdAt={server.createdAt}
        id={server.id}
        avatarURL={server.avatarURL}
        active={server.active}
        name={server.name}
        url={server.url}
        key={i}
      />
    ) : (
      <ServerFolder serversFolder={server} key={i} />
    );
  });
};

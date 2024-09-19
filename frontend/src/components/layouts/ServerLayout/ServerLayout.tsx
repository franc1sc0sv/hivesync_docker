import { Notifications } from "../../Alerts/Notification";
import { Channel } from "./Components/Channel/Channel";
import { ServerHome } from "./Components/ServerHome/ServerHome";
import { ServerIcons } from "./Components/ServerIcons/ServersIcons";

import { NoServers } from "./Components/NoServers";
import { useServer } from "./hooks/useServer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_last_server } from "../GeneralLayout/GeneralLayout";
import { ChannelListProvider } from "./Context/ChannelListContext";

const obtener_server_id_activo = () => {
  const currentURL = window.location.pathname;
  return currentURL.split("/")[2];
};

export const ServerLayout = () => {
  const { server_data } = useServer();

  return server_data?.length ? <AreServersLayout /> : <NoServersLayout />;
};

const AreServersLayout = () => {
  const { server_data, selected_server } = useServer();
  const stylesServers = server_data?.length ? "w-[200%]" : "w-full";
  const navigate = useNavigate();

  useEffect(() => {
    if (!obtener_server_id_activo()) {
      navigate(get_last_server());
    }
  }, []);

  return (
    <article
      className={`flex justify-center h-[80vh] md:h-[95vh] gap-3 overflow-hidden ${stylesServers}`}
    >
      <ServerIcons server_data_icons={server_data} />
      <ChannelListProvider channels={selected_server.channels}>
        <ServerHome specific_server_data={selected_server} />
        <Channel />
      </ChannelListProvider>
      <Notifications />
    </article>
  );
};

export const NoServersLayout = () => {
  return (
    <article
      className={`flex justify-center h-[80vh] md:h-[95vh] gap-3 overflow-hidden `}
    >
      <ServerIcons server_data_icons={[]} />
      <NoServers />
      <Notifications />
    </article>
  );
};

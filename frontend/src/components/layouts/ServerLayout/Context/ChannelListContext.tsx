import { ReactNode, createContext, useEffect, useState } from "react";
import {
  ChannelsFormated,
  ChannelType,
  ServerChannelsAray,
} from "../types/server";

interface ChannelContextType {
  channelList: ServerChannelsAray;
  setChannelList: React.Dispatch<React.SetStateAction<ServerChannelsAray>>;
  toogleCategory: (category: string) => void;
  setCurrentChannel: (id: string, source?: boolean) => void;
  actualChannel: ChannelType | null;
  setActualChannel: React.Dispatch<React.SetStateAction<ChannelType | null>>;
}

const obtener_canal_id_activo = () => {
  const currentURL = window.location.pathname;
  return currentURL.split("/")[3];
};

const format_channels = ({
  channels,
  id,
}: {
  channels: ChannelType[];
  id: string;
}) => {
  return channels.map((channel) => {
    return { ...channel, isSelected: id === channel.id };
  });
};

const updateUrl = (id: string) => {
  const currentUrl = window.location.href;
  const newUrl = currentUrl.replace(/[^/]+$/, id);

  window.history.pushState({}, "", newUrl);
};

export const ChannelListContext = createContext<ChannelContextType>({
  channelList: [],
  setChannelList: () => {},
  toogleCategory: () => {},
  setCurrentChannel: () => {},
  actualChannel: null,
  setActualChannel: () => {},
});

export const ChannelListProvider = ({
  children,
  channels,
}: {
  children: ReactNode;
  channels: ChannelType[];
}) => {
  const [channelList, setChannelList] = useState<ServerChannelsAray>([]);
  const [actualChannel, setActualChannel] = useState<ChannelType | null>(null);

  const toogleCategory = (category: string) => {
    const categoryChanels = channelList.filter(
      (list) => list.category === category
    );

    const new_data = channelList.map((list) => {
      return category === list.category
        ? { ...categoryChanels[0], isCategoryActive: !list.isCategoryActive }
        : list;
    });

    setChannelList(new_data);
  };

  const setCurrentChannel = (id: string, source: boolean = false) => {
    const new_data = channelList.map((list) => {
      const formated_channels = list.channels.map((channel) => {
        return { ...channel, isSelected: id === channel.id };
      });
      return { ...list, channels: formated_channels };
    });

    // Buscar y establecer el actualChannel
    const selectedChannel = new_data
      .flatMap((list) => list.channels)
      .find((channel) => channel.id === id);

    if (selectedChannel?.type === "VIDEO" && !source) return;

    updateUrl(id);

    setActualChannel(selectedChannel || null);

    setChannelList(new_data);
  };

  useEffect(() => {
    const active_channel = obtener_canal_id_activo();

    const formaetedChannels = format_channels({
      channels: channels,
      id: active_channel,
    });

    const groupedData = formaetedChannels.reduce((acc: any, curr: any) => {
      const category = curr.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(curr);
      return acc;
    }, {});

    const channels_by_categories: ChannelsFormated[][] =
      Object.values(groupedData);

    const formatedChannels: ServerChannelsAray = channels_by_categories.map(
      (channelArray) => {
        return {
          channels: [...channelArray],
          isCategoryActive: false,
          category: channelArray[0].category,
        };
      }
    );

    setChannelList(formatedChannels);

    // Establecer el actualChannel en el canal activo al cargar
    const selectedChannel = formaetedChannels.find(
      (channel) => channel.id === active_channel
    );
    setActualChannel(selectedChannel || null);
  }, [channels]);

  return (
    <ChannelListContext.Provider
      value={{
        channelList,
        setChannelList,
        toogleCategory,
        setCurrentChannel,
        actualChannel,
        setActualChannel,
      }}
    >
      {children}
    </ChannelListContext.Provider>
  );
};

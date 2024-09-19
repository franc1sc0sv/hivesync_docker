type ServerDataIcons = (ServerInfoIcons[] | ServerInfoIcons)[];

type SpecificServer = {
  IconServerURL: string;
  url: string;
  active: boolean;
  id: string;
  name: string;
  channels: Channels[];
};

type ServerChannels = {
  channels: Channels[];
  isCategoryActive: boolean;
  category: Category | any;
};

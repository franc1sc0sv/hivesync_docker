import { ChannelTypeEnum } from "../Enums/SpecificServer";

type ServerDataIcons = ServerInfoIcons[];

type ServerInfoIcons = {
  id: string;
  name: string;
  avatarURL: string;
  privacity: string;
  createdAt: Date;

  url: string;
  active: boolean;
};

type ServerFromApi = {
  id: string;
  name: string;
  avatarURL: string;
  privacity: string;
  createdAt: Date;
  url: string;
};

type SpecificServerType = {
  id: string;
  name: string;
  avatarURL: string;
  privacity: "PUBLIC" | "PRIVATE";
  id_user: string;
  createdAt: string;
  url: string;
  backgroundUrl: string

  tags: any[];
  categories: CategoryType[];
  events: any[];
  members: any[];
  channels: ChannelType[];
};

type CategoryType = {
  id: string;
  name: string;
  serverId: string;
};

type ChannelType = {
  id: string;
  name: string;
  CategoryID: string;
  ServerID: string;
  type: ChannelTypeEnum;
};

type ChannelsFormated = {
  id: string;
  name: string;
  CategoryID: string;
  ServerID: string;
  type: ChannelTypeEnum;

  category: Category | any;
  isSelected: boolean;
};

type ServerChannelsAray = {
  channels: ChannelsFormated[];
  isCategoryActive: boolean;
  category: Category | any;
}[];

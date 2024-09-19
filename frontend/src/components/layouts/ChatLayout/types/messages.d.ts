type Message = {
  id: string;
  message: string;
  sendAt: string;
  id_sender: string;
  id_inbox: string;
};

type GroupedMessagesType = {
  id_user: string;
  sendAt: string;
  messages: MessageFormatedArray;
  user: UserInfo;
};

type MessageFormated = {
  id: string;
  message: string;
};

type UserInfo = {
  name: string;
  username: string;
  about: string;
  profileUrl: string;
  backgroundUrl: string;
  id_user: string;
  createdAt: string;
};

type GroupedMessagesTypeArray = GroupedMessagesType[];

type MessageFormatedArray = MessageFormated[];

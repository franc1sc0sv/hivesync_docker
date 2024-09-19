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

type GroupedMessagesTypeArray = GroupedMessagesType[];

type MessageFormatedArray = MessageFormated[];

type UserInfo = {
  id: string;
  name: string;
  username: string;
  about: string;
  profileUrl: string;
  backgroundUrl: string;
  id_user: string;
  createdAt: string;
};

type UserInfoChat = {
  id_friendship: string;
  name: string;
  username: string;
  about: string;
  profileUrl: string;
  backgroundUrl: string;
  id_user: string;
  createdAt: string;
};

type FriendWithUserInfo = {
  id_friendship: string;
  createdAt_friendship: string;
  id_user_friendship: string;
  messagePreview: string;
  timeAgo: string;
  userInfo: UserInfo;
};

type FriendsWithUserInfoArray = FriendWithUserInfo[];

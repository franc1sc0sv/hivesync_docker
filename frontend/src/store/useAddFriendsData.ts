import { create } from "zustand";

type FriendsData = {
  id_request: string;
  id_who_sent: string;
  username_who_sent: string;
  profile_url: string;
  background_url: string;
  id_notification: string;
};

type Props = {
  friendsData: FriendsData;
  setFriendsData: (value: FriendsData) => void;
};

const useAddFriendsData = create<Props>((set) => ({
  friendsData: {
    id_request: "",
    id_who_sent: "",
    username_who_sent: "",
    profile_url: "",
    background_url: "",
    id_notification: "",
  },
  setFriendsData: (value) => set({ friendsData: value }),
}));

export { useAddFriendsData };

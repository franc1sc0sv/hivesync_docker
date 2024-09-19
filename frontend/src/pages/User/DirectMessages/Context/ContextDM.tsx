import { ReactNode, createContext, useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import { LoadingPage } from "../../../../components/routes/loadingPage";
import { get_friends_data } from "../../../../api/user_info";

interface DmContextProps {
  friends: FriendsWithUserInfoArray;
  setFriends: React.Dispatch<React.SetStateAction<FriendsWithUserInfoArray>>;
  selectedChat: string;
  setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
}

export const DmContext = createContext<DmContextProps>({
  friends: [],
  setFriends: () => {},
  selectedChat: "",
  setSelectedChat: () => {},
});

export const DmProvider = ({ children }: { children: ReactNode }) => {
  const [friends, setFriends] = useState<FriendsWithUserInfoArray>([]);
  const [selectedChat, setSelectedChat] = useState<string>("");

  const { fecthData, isLoading } = useFetch({
    api_function: get_friends_data,
  });

  useEffect(() => {
    const fetching = async () => {
      const friends = await fecthData();
      setFriends(friends);
    };
    fetching();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <DmContext.Provider
      value={{ friends, setFriends, selectedChat, setSelectedChat }}
    >
      {children}
    </DmContext.Provider>
  );
};

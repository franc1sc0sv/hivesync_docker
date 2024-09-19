import { useCustomForm } from "../../../../hooks/useForm";
import { SearchBar } from "../../../forms/Inputs/SearchBar";

import { AddFriendsButton } from "../../../buttons/AddFriendsButton";

import { ExternalProfileModal } from "../../../modals/generalModals/externalProfileModal";

import { UserBox } from "./Components/UserBox";

const temporaryRoute =
  "https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg";

const friends = [
  { username: "arsene_lupin", picture: temporaryRoute },
  { username: "arsene_lupin", picture: temporaryRoute },
  { username: "arsene_lupin", picture: temporaryRoute },
  { username: "arsene_lupin", picture: temporaryRoute },
  { username: "arsene_lupin", picture: temporaryRoute },
  { username: "arsene_lupin", picture: temporaryRoute },
  { username: "arsene_lupin", picture: temporaryRoute },
  { username: "arsene_lupin", picture: temporaryRoute },
  { username: "arsene_lupin", picture: temporaryRoute },
  { username: "arsene_lupin", picture: temporaryRoute },
  { username: "arsene_lupin", picture: temporaryRoute },
];

export const UserFriendsFakePage: React.FC = () => {
  return (
    <div className="w-4/5 h-full gap-5 p-1">
      <Header />
      <FriendsList />
    </div>
  );
};

const Header = () => {
  const api = () => console.log("hola, *llama a la api épicamente*");
  const success = () => console.log("success");

  const { onSubmit, register } = useCustomForm(api, success, "");

  return (
    <div className="flex flex-row items-center justify-between gap-5 my-2">
      <form onSubmit={onSubmit}>
        <SearchBar register={register} name="friend" placeholder="Buscar" />
      </form>
      <AddFriendsButton />
    </div>
  );
};

const FriendsList: React.FC = () => {
  return (
    <div className="overflow-y-auto h-4/5">
      {friends.map((friend, index) => (
        <UserBox
          avatarURL={friend.picture}
          username={friend.username}
          key={index}
        />
      ))}

      <ExternalProfileModal />
    </div>
  );
};

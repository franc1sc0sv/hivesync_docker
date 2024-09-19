import { UserAddIcon } from "../Icons/userAdd";

import useFakePages from "../../store/useFakePage";
import { AddFriendsFakePage } from "../fakePages/user/friends/AddFriendsFakePage";


export const AddFriendsButton = () => {

  const { addFakePage } = useFakePages()

  return (
    <div>
      <button
        onClick={() => addFakePage({ title: "Añadir amigos", children: <AddFriendsFakePage /> })}
        className="flex flex-row items-center justify-end gap-2 sm:h-1/4 bg-overlay_1"
      >
        <UserAddIcon size={30} color="white" />
        <h2 className="text-custom_white text-md">Añadir amigos</h2>
      </button>
    </div>
  );
};

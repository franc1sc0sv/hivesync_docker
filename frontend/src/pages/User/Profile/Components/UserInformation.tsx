import { EditProfileOption } from "../../../../components/buttons/EditProfileOption";
import { AddStatusModal } from "../../../../components/modals/userModals/profile/AddStatusModal";

import useFakePages from "../../../../store/useFakePage";
import { ShowFakePages } from "../../../../components/fakePages/ShowFakePages";
import { EditProfileFakePage } from "../../../../components/fakePages/user/profile/editProfileFakePage";

import { formatDate } from "../../../../helpers/date";

// const friendsMiniPictures = [
//   { picture: userData.picture },
//   { picture: userData.picture },
//   { picture: userData.picture },
//   { picture: userData.picture },
// ];

interface ProfileProps {
  user: Usuario
}

export const UserInformation: React.FC<ProfileProps> = ({user}) => {
  return (
    <div className="h-3/5 w-full lg:w-[90%] mx-auto flex flex-col gap-5 overflow-y-auto">
      <MainInformation user={user} />

      <AboutUser user={user} />
      {/* <UserFriends /> */}

      <ShowFakePages />
      <AddStatusModal />
    </div>
  );
};

const MainInformation: React.FC<ProfileProps> = ({user}) => {
  const { addFakePage } = useFakePages();

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg bg-overlay_2 ">
      <div className="flex flex-col gap-1">
        <p className="text-2xl text-custom_white ">{user?.username}</p>
        <p className="text-sm text-gray ">{user?.name}</p>
      </div>

      <div className="flex w-full gap-5 lg:justify-start">
        {/* <EditProfileOption
          title="Añadir estado"
          option={true}
          modalId="añadirEstado"
        /> */}

        <div
          onClick={() =>
            addFakePage({
              title: "Editar perfil",
              children: <EditProfileFakePage />,
            })
          }
        >
          <EditProfileOption title="Editar perfil" option={false} modalId="" />
        </div>
      </div>
    </div>
  );
};

const AboutUser: React.FC<ProfileProps> = ({user}) => {
  return (
    <div className="flex flex-col gap-3 p-3 rounded-lg bg-overlay_2">
      <div className="flex flex-col text-custom_white">
        <h3 className="text-lg">Sobre mí</h3>
        <p className="text-gray">{user?.about}</p>
      </div>

      <div className="flex flex-col text-custom_white">
        <h3 className="text-lg">Miembro de HiveSync desde </h3>
        <p className="text-gray">{formatDate(user?.createdAt as string)}</p>
      </div>
    </div>
  );
};

// const UserFriends = () => {
//   const { addFakePage } = useFakePages();

//   return (
//     <div
//       onClick={() =>
//         addFakePage({ title: "Mis amigos", children: <UserFriendsFakePage /> })
//       }
//       className="flex flex-row items-center justify-between p-3 rounded-lg bg-overlay_2"
//     >
//       <h1 className="text-custom_white">Mis amigos</h1>

//       <div className="flex -space-x-4 rtl:space-x-reverse">
//         {friendsMiniPictures.map((friend, index) => (
//           <img
//             key={index}
//             className="object-cover object-center w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
//             src={friend.picture}
//             alt="Friend Profile picture"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

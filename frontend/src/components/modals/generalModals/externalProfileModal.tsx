import { ModalTemplate } from "../ModalTemplate";

import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaPhone } from "react-icons/fa6";
import { HiVideoCamera } from "react-icons/hi";
import { HiOutlineUserRemove } from "react-icons/hi";
import { IoIosWarning } from "react-icons/io";

const temporaryRoute =
  "https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg";

interface User {
  username: string;
  about: string;
  name: string;
  memberSince: string;
  spotify: boolean;
  github: boolean;
}

const user: User = {
  name: "Arsene Lupin",
  username: "arsene_lupin",
  about: "Me gusta la lasaña",
  memberSince: "21 de septiembre de 2005",
  spotify: true,
  github: true,
};

export const ExternalProfileModal = () => {
  return (
    <ModalTemplate identificator="externalProfile">
      <Profile />
    </ModalTemplate>
  );
};

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col w-full gap-5 h-4/5">
      <Cover />
      <About />
      <Options />
    </div>
  );
};

const Cover = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="max-w-2xl text-gray-900 rounded-lg sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto">
        {/* cover  */}
        <div className="relative overflow-hidden rounded-xl h-36 bg-primary"></div>

        {/* icon */}
        <div className="absolute ml-5 -mt-20 overflow-hidden w-28 h-28 md:mx-auto rounded-2xl">
          <img
            className="object-cover object-center w-full h-full"
            src={temporaryRoute}
            alt="Profile picture"
          />
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 p-3 mt-10 rounded-lg bg-overlay_2">
        <div className="flex flex-col gap-1">
          <p className="text-2xl text-left text-custom_white">{user.name}</p>
          <p className="text-sm text-left text-gray">{user.username}</p>
        </div>

        <Actions />
      </div>

      <div className="flex flex-col gap-3 p-3 rounded-lg bg-overlay_2">
        <div className="flex flex-col text-custom_white">
          <h3 className="text-lg text-left">Sobre {user.name}</h3>
          <p className="text-left text-gray">{user.about}</p>
        </div>

        <div className="flex flex-col text-custom_white">
          <h3 className="text-lg text-left">Miembro de HiveSync desde</h3>
          <p className="text-left text-gray">{user.memberSince}</p>
        </div>
      </div>
    </div>
  );
};

const Actions: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <button className="p-3 rounded-full w-max">
          <HiChatBubbleLeftRight
            size={45}
            className="p-1 rounded-lg fill-white bg-primary"
          />
        </button>
        <p className="text-sm text-center font-almarai text-custom_white">
          Mensaje
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <button className="p-3 rounded-full w-max">
          <FaPhone size={40} className="p-1 rounded-lg fill-white bg-primary" />
        </button>
        <p className="text-sm text-center font-almarai text-custom_white">
          Llamada de voz
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <button className="p-3 rounded-full w-max">
          <HiVideoCamera
            size={45}
            className="p-1 rounded-lg fill-white bg-primary"
          />
        </button>
        <p className="text-sm text-center font-almarai text-custom_white">
          Videollamada
        </p>
      </div>
    </div>
  );
};

const Options = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 p-3 my-5 bg-overlay_2 rounded-xl">
        <div className="flex flex-row items-center gap-3">
          <div>
            <div className="p-2 text-3xl bg-gray text-custom_white rounded-xl">
              <HiOutlineUserRemove />
            </div>
          </div>
          <p className="text-custom_white">Eliminar amigo</p>
        </div>

        <div className="flex flex-row items-center gap-3">
          <div>
            <div className="p-2 text-3xl bg-gray text-custom_white rounded-xl">
              <IoIosWarning />
            </div>
          </div>
          <p className="text-custom_white">Reportar</p>
        </div>
      </div>
    </div>
  );
};

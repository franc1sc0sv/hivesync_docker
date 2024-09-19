import { ModalTemplate } from "../../ModalTemplate";
import { useModal } from "../../../../store/useModal";

import { UserAddIcon } from "../../../Icons/userAdd";
import { useFetchID } from "../../../../hooks/useFecthID";
import { get_all_memebrs } from "../../../../api/server";
import { useEffect, useState } from "react";
import { useServer } from "../../../layouts/ServerLayout/hooks/useServer";
import { LoadingPage } from "../../../routes/loadingPage";
import { Server } from "http";
import { UserAvatar } from "../../../Avatars/UserAvatar";

import { GiCrenelCrown } from "react-icons/gi";
import { useSession } from "../../../../store/user";

type ServerMember = {
  id: string;
  id_user: string;
  role: string;
  joinedAt: string; // ISO 8601 date string
  serverId: string;
  isActiveInServer: boolean;
  server: Server;
  user: {
    profileUrl: string;
    backgroundUrl: string;
    name: string;
    createdAt: string;
    about: string;
    username: string;
  };
};

export const MembersListModal: React.FC = () => {
  return (
    <ModalTemplate identificator="membersList">
      <MembersList />
    </ModalTemplate>
  );
};

const MembersList = () => {
  const [members, setMembers] = useState<ServerMember[]>([]);

  const { fecthData, isLoading } = useFetchID({
    api_function: get_all_memebrs,
  });
  const {
    selected_server: { id },
  } = useServer();

  useEffect(() => {
    const fetcher = async () => {
      const members = await fecthData(id);
      setMembers(members);
    };
    fetcher();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="h-full w-full lg:w-3/5 mx-auto p-1 flex flex-col gap-5">
      <p className="text-2xl text-custom_white text-center">
        Miembros del servidor
      </p>
      <Header />
      <List members={members} />
    </div>
  );
};

const Header: React.FC = () => {
  const { setModalId } = useModal();

  return (
    <div className="w-full flex flex-row justify-between items-center gap-5">
      <div className="w-full lg:w-1/3">
        <button
          onClick={() => setModalId("addServerMembers")}
          className="flex flex-row flex-wrap items-center justify-center mx-auto gap-2 sm:h-1/4 bg-overlay_1"
        >
          <UserAddIcon size={30} color="white" />
          <h2 className="text-custom_white text-md">Añadir miembros</h2>
        </button>
      </div>
    </div>
  );
};

const List = ({ members }: { members: ServerMember[] }) => {
  const { user } = useSession();

  return (
    <div className="h-4/5 overflow-y-auto gap-4 flex flex-col">
      {members.map((member, i) => (
        <div
          key={i}
          style={{
            borderColor:
              user?.id === member.id_user ? "#f6f1aa" : "transparent",
          }}
          className="flex flex-row items-center gap-2 px-5 p-3 justify-between rounded-xl bg-overlay_2 border-2"
        >
          <div className="flex flex-row items-center gap-5">
            <UserAvatar
              w={4}
              h={4}
              fontSize={2}
              profileURl={member.user.profileUrl}
              username={member.user.username}
            />
            <div className="flex flex-row items-center gap-5 rounded-2xl">
              <p className="text-xl text-custom_white font-almarai">
                {member.user.username}
              </p>
            </div>
          </div>

          {member.role === "ADMIN" && (
            <GiCrenelCrown size={40} color="#f6f1aa" />
          )}
        </div>
      ))}
    </div>
  );
};

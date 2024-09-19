import {
  accept_invitation_server,
  reject_invitation_server,
} from "../../../../api/server";

import { useToogleAPI } from "../../../../hooks/useToogleAPI";
import { useAddMembers } from "../../../../store/useAddMembers";

import { CustomizedButton } from "../../../buttons/customizedButton";
import { ModalTemplate } from "../../ModalTemplate";
import { ServerIcon } from "../serverInfoModal";

export const NotificationMemberModal = () => {
  return (
    <ModalTemplate identificator="NotifiactionMemberModal">
      <div className="w-full h-full flex flex-col justify-between items-center p-3">
        <div className="w-4/5 sm:w-4/5 lg:w-3/5 flex flex-col justify-center items-center gap-4">
          <ServerCover />
          <MainInformation />
        </div>

        <ButtonsActions />
      </div>
    </ModalTemplate>
  );
};

const MainInformation: React.FC = () => {
  return (
    <div className="w-full lg:w-[90%]">
      <p className="text-left  text-gray font-extralight">
        Te ha invitado a formar parte de su servidor
      </p>
    </div>
  );
};

const ButtonsActions = () => {
  const { MemberData } = useAddMembers();

  const data = { notification_id: MemberData?.id_notification };
  const id_server = MemberData?.server.id as string;

  const handleClickAccept = async () => {
    await accept_invitation_server(data, id_server);
  };

  const handleClickReject = async () => {
    await reject_invitation_server(data, id_server);
  };

  const { onSubmit: OnSubmitReject } = useToogleAPI({
    api_function: handleClickReject,
    url: "/app/@me",
  });

  const { onSubmit: OnSubmitAccept } = useToogleAPI({
    api_function: handleClickAccept,
    url: "/app/@me",
  });

  const acceptRequest = async () => {
    await OnSubmitAccept(data);
  };

  const declineRequest = async () => {
    await OnSubmitReject(data);
  };

  return (
    <ButtonsContainer
      acceptRequest={acceptRequest}
      declineRequest={declineRequest}
    />
  );
};

const ButtonsContainer = ({
  acceptRequest,
  declineRequest,
}: {
  acceptRequest: () => Promise<void>;
  declineRequest: () => Promise<void>;
}) => {
  return (
    <div className="flex w-4/5 lg:w-1/2 mx-auto gap-5">
      <CustomizedButton
        text="Aceptar"
        color="#382C6C"
        displayIcon={false}
        onAction={acceptRequest}
      />

      <CustomizedButton
        text="Rechazar"
        color="#EF4444"
        displayIcon={false}
        onAction={declineRequest}
      />
    </div>
  );
};

const ServerCover: React.FC = () => {
  const { MemberData } = useAddMembers();

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="w-full mx-auto text-gray-900 rounded-lg ">
        {/* cover  */}
        <div
          style={{ backgroundColor: "rgb(56 44 108)" }}
          className={`relative w-full overflow-hidden rounded-xl h-36`}
        ></div>

        {/* icon */}
        <div className="absolute ml-5 -mt-16 overflow-hidden w-28 h-28 rounded-2xl">
          <ServerIcon
            name={MemberData?.server.name as string}
            IconServerURL={MemberData?.server.avatarURL as string}
          />
        </div>
      </div>
      <p className=" text-2xl font-extrabold text-white">Hivesync</p>
    </div>
  );
};

import {
  accept_friend_request,
  reject_friend_request,
} from "../../../../api/social";
import { useToogleAPI } from "../../../../hooks/useToogleAPI";
import { ProfileCover } from "../../../../pages/User/Profile/Components/Cover";
import { useAddFriendsData } from "../../../../store/useAddFriendsData";

import { CustomizedButton } from "../../../buttons/customizedButton";
import { ModalTemplate } from "../../ModalTemplate";

export const AddFriendModal = () => {
  const { friendsData } = useAddFriendsData();

  return (
    <ModalTemplate identificator="AddFriendModal">
      <div className="w-full h-full flex flex-col justify-between items-center p-3">
        <div className="w-4/5 sm:w-4/5 lg:w-3/5 flex flex-col justify-center items-center gap-4">
          <ProfileCover
            backgroundUrl={friendsData.background_url}
            profileUrl={friendsData.profile_url}
            username={friendsData.username_who_sent}
            show_config={false}
          />
          <MainInformation />
        </div>

        <ButtonsActions />
      </div>
    </ModalTemplate>
  );
};

const MainInformation: React.FC = () => {
  const { friendsData } = useAddFriendsData();

  return (
    <div className="w-full lg:w-[90%]">
      <p className="text-left text-xl text-white font-extralight font-amiko">
        <span
          // style={{ color: friendsData.background_url }}
          className="font-extrabold text-light_purple"
        >
          {friendsData.username_who_sent + " "}
        </span>
        te ha enviado una solicitud de amistad
      </p>
    </div>
  );
};

const ButtonsActions = () => {
  const { friendsData } = useAddFriendsData();

  const { onSubmit: OnSubmitReject } = useToogleAPI({
    api_function: reject_friend_request,
    url: "/app/@me",
  });

  const { onSubmit: OnSubmitAccept } = useToogleAPI({
    api_function: accept_friend_request,
    url: "/app/@me",
  });

  const data = {
    requestId: friendsData.id_request,
    notificationId: friendsData.id_notification,
  };

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

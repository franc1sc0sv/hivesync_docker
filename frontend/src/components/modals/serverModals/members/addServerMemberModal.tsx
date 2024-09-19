import { ModalTemplate } from "../../ModalTemplate";

import { SearchBar } from "../../../forms/Inputs/SearchBar";
import { SubmitButton } from "../../../forms/Inputs/Button";

import { useFormData } from "../../../../hooks/useFormData";
import { get_user_username_server } from "../../../../api/user_info";
import { LoadingPage } from "../../../routes/loadingPage";
import { UserBoxMembers } from "./UserBoxMembers";
import { useServer } from "../../../layouts/ServerLayout/hooks/useServer";

export const AddServerMembersModal: React.FC = () => {
  return (
    <ModalTemplate identificator="addServerMembers">
      <AddMembers />
    </ModalTemplate>
  );
};

const AddMembers: React.FC = () => {
  return (
    <section className="flex flex-col w-full h-full gap-10 my-10">
      <SendInvitationForm />
    </section>
  );
};

const SendInvitationForm = () => {
  const { data, onSubmit, register, isLoading } = useFormData({
    api_function: get_user_username_server,
    resetF: false,
  });

  if (isLoading) <LoadingPage />;

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-between w-full gap-2 p-5 h-4/5"
    >
      <div className="flex flex-col gap-4">
        <p className="text-2xl text-center text-custom_white">
          Agregar miembros al servidor
        </p>
        <div className="mx-auto flex flex-col items-center w-[320px] gap-5">
          <SearchBar
            name="username"
            register={register}
            placeholder="Busca un nombre de usuario"
          />

          <User data={data} />
        </div>
      </div>

      <div className="w-[320px] mx-auto flex flex-col items-end justify-end py-10 md:p-0 ">
        <SubmitButton text="Buscar" isLoading={isLoading} />
      </div>
    </form>
  );
};

const User = ({ data }: { data: UserProfile }) => {
  const {
    selected_server: { id },
  } = useServer();

  if (!data) return;
  if (!data.id) return <NoResults />;
  return (
    <UserBoxMembers
      id_user={data.id_user}
      id={id}
      isFromFriends
      avatarURL={data.profileUrl}
      username={data.username}
    />
  );
};

const NoResults = () => {
  return (
    <div className="flex items-start w-full">
      <p className="text-sm text-red-500 font-amiko">
        Ups al parecer hubo un error al encontrar este usuario
      </p>
    </div>
  );
};

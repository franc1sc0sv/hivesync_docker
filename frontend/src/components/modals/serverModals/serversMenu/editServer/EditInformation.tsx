import { ModalTemplate } from "../../../ModalTemplate";
import { useModal } from "../../../../../store/useModal";

import { edit_server_name } from "../../../../../api/server";
import { useCustomFormModal } from "../../../../../hooks/useFormModal";
import { useServer } from "../../../../layouts/ServerLayout/hooks/useServer";
import { useGetColorLuminance } from "../../../../../hooks/useGetColorLuminance";

import { SubmitButton } from "../../../../forms/Inputs/Button";
import { InputsForms } from "../../../../forms/Inputs/inputs";

//icons
import { PencilIcon } from "../../../../Icons/pencil";

//mock
import { ServerIcon } from "../../serverInfoModal";
import { replace, useNavigate } from "react-router-dom";

export const EditServerModal: React.FC = () => {
  return (
    <ModalTemplate identificator="editServer">
      <Modal />
    </ModalTemplate>
  );
};

const Modal = () => {
  return (
    <div className="flex flex-col w-full gap-5">
      <p className="text-2xl text-center text-custom_white">Editar servidor</p>
      <ServerCover />
      <ServerInformation />
      <Form />
    </div>
  );
};

const ServerCover = () => {
  const { selected_server } = useServer();
  const { setModalId } = useModal();

  const buttonColor = useGetColorLuminance(selected_server.backgroundUrl);

  return (
    <div className="w-4/5 mx-auto text-gray-900 rounded-lg sm:w-3/5 lg:w-1/3">
      <div
        style={{ backgroundColor: selected_server.backgroundUrl }}
        className={`relative overflow-hidden rounded-xl h-36`}
      >
        <EditCoverThemeButton buttonColor={buttonColor} />
      </div>
      <div
        className="relative flex items-center justify-center w-24 h-24 ml-5 -mt-20 overflow-hidden rounded-2xl"
        onClick={() => setModalId("editServerPicture")}
      >
        <ServerIcon
          name={selected_server.name}
          IconServerURL={selected_server.avatarURL}
        />
        <span className="absolute bottom-0 right-0 z-10 w-10 h-10 transition duration-300 border border-white rounded-full left-15 bg-overlay_2 hover:bg-light_purple dark:border-gray-800">
          <div className="absolute cursor-pointer bottom-1 right-1">
            <PencilIcon size={30} color="white" />
          </div>
        </span>
      </div>
    </div>
  );
};

const EditCoverThemeButton = ({ buttonColor }: { buttonColor: string }) => {
  const { setModalId } = useModal();
  return (
    <div
      className="absolute top-0 right-0 z-50 p-3"
      onClick={() => setModalId("editCoverColor")}
    >
      <PencilIcon size={30} color={buttonColor} />
    </div>
  );
};

const ServerInformation: React.FC = () => {
  const { selected_server } = useServer();

  return (
    <div className="w-4/5 mx-auto sm:w-3/5 lg:w-1/3">
      <div className="flex flex-col justify-start gap-2 rounded-lg">
        <p className="text-2xl text-custom_white text-start">
          {selected_server?.name}
        </p>
      </div>
    </div>
  );
};

const Form: React.FC = () => {

  const { selected_server } = useServer();

  const api_function = async (data: any) => {
    edit_server_name(selected_server.id, data);
    // setShouldFetch(true);
  };

  const { onSubmit, register, isLoading } = useCustomFormModal(api_function)

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center w-4/5 gap-5 px-1 mx-auto overflow-y-auto sm:w-3/5 lg:w-1/3"
    >
      <InputsForms
        title="Nombre del servidor"
        register={register}
        name="name"
        placeholder="Escribe un nombre"
        inputValue={selected_server?.name}
      />

      <SubmitButton text="Guardar cambios" isLoading={isLoading} />
    </form>
  );
};

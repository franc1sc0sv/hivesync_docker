import { ModalTemplate } from "../../../ModalTemplate";
import { ColorPickerInput } from "../../../../forms/Inputs/ColorPicker";
import { useCustomFormModal } from "../../../../../hooks/useFormModal";
import { useServer } from "../../../../layouts/ServerLayout/hooks/useServer";
import { edit_server_cover } from "../../../../../api/server";

import { SubmitButton } from "../../../../forms/Inputs/Button";

export const EditCoverModal: React.FC = () => {
  return (
    <ModalTemplate identificator="editCoverColor">
      <Form />
    </ModalTemplate>
  );
};

const Form: React.FC = () => {
  const { selected_server, setShouldFetch } = useServer();

  const api_function = (data: any) => {
    edit_server_cover(selected_server.id, data)
    setShouldFetch(true);
  };

  const { onSubmit, register, isLoading } = useCustomFormModal(api_function)

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center w-full h-full gap-5 p-4 mx-auto text-white sm:w-4/5 lg:w-1/2 "
    >
      <ColorPickerInput 
      inputValue={selected_server.backgroundUrl}
      register={register} name="color" />
      <p
        // onClick={() => resetColor()}
        onClick={() => {}}
        className="p-2 my-2 text-xl transition-all duration-300 border-2 border-overlay_1 hover:border-2 hover:border-custom_white rounded-xl text-center"
      >
        Restablecer color de tema
      </p>
      <SubmitButton text="Guardar cambios" isLoading={isLoading} />
    </form>
  );
};

import { ModalTemplate } from "../../ModalTemplate";
import { InputsForms } from "../../../forms/Inputs/inputs";
import { SubmitButton } from "../../../forms/Inputs/Button";
import { create_category } from "../../../../api/server";
import { useServer } from "../../../layouts/ServerLayout/hooks/useServer";
import { useCustomFormModalID } from "../../../../hooks/useFormModalID";

export const CreateCategory: React.FC = () => {
  return (
    <ModalTemplate identificator="CreateCategory">
      <div className="flex flex-col items-center justify-center h-full gap-5">
        <ModalHeader />
        <ModalForm />
      </div>
    </ModalTemplate>
  );
};

const ModalHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="text-2xl font-bold text-center font-amiko text-custom_white">
        Crear categoria
      </p>
    </div>
  );
};

const ModalForm = () => {
  const {selected_server:{id}} = useServer()
  const { register, isLoading, onSubmit } = useCustomFormModalID(create_category, id);

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center w-full gap-5 px-1 overflow-y-auto"
    >
      <InputsForms
        title="Nombre de la categoria"
        register={register}
        name="name"
        placeholder="Nombre de la categoria"
      />

      <SubmitButton text="Crear" isLoading={isLoading} />
    </form>
  );
};

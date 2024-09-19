import { useCustomFormCreateServer } from "../../../hooks/useFormCreateServer";
import { SubmitButton } from "../../forms/Inputs/Button";

import { InputsForms } from "../../forms/Inputs/inputs";
import { ModalTemplate } from "../ModalTemplate";

import { create_server } from "../../../api/server";
import { useState } from "react";
import { RadioInput } from "../../forms/Inputs/Radio/InputRadio";

import { FaLock } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

enum ServerPrivacity {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

const options = [
  {
    label: "Publico",
    value: ServerPrivacity.PUBLIC,
    description: "Chatea y envia imagenes",
    Icon: TbWorld,
  },
  {
    label: "Privado",
    value: ServerPrivacity.PRIVATE,
    description: "Comunicate por voz y video",
    Icon: FaLock,
  },
];

export const CreateServerModal: React.FC = () => {
  return (
    <ModalTemplate identificator="createServer">
      <div className="flex flex-col gap-5">
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
        Crea tu servidor
      </p>
    </div>
  );
};

const ModalForm = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { register, isLoading, onSubmit, setValue } =
    useCustomFormCreateServer(create_server);

  const handleOptionChange = (value: string) => {
    setValue("privacity", value);
    setSelectedOption(value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center w-full gap-5 px-1 overflow-y-auto"
    >
      <div className="w-[320px]">
        <InputsForms
          title="Nombre del servidor"
          register={register}
          name="name"
          placeholder="Nombre del servidor"
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-10">
        <RadioInput
          title="Tipo de canal"
          options={options}
          name="exampleOptions"
          selectedValue={selectedOption}
          onChange={handleOptionChange}
        />
      </div>

      <div className="w-[320px]">
        <SubmitButton text="Crear servidor" isLoading={isLoading} />
      </div>
    </form>
  );
};

import { ModalTemplate } from "../../ModalTemplate";

import { InputsForms } from "../../../forms/Inputs/inputs";
import { SubmitButton } from "../../../forms/Inputs/Button";
import { SelectInput } from "../../../forms/Inputs/Select/Select";

import { BiSolidCategory } from "react-icons/bi";
import { useServer } from "../../../layouts/ServerLayout/hooks/useServer";
import { RadioInput } from "../../../forms/Inputs/Radio/InputRadio";
import { useEffect, useState } from "react";
import { ChannelTypeEnum } from "../../../layouts/ServerLayout/Enums/SpecificServer";


import { HiSpeakerWave } from "react-icons/hi2";
import { HiHashtag } from "react-icons/hi";
import { useCustomFormModalID } from "../../../../hooks/useFormModalID";
import { useFetchID } from "../../../../hooks/useFecthID";
import { get_all_category } from "../../../../api/server";
import { create_channel } from "../../../../api/channel";


const options = [
  {
    label: "Texto",
    value: ChannelTypeEnum.TEXT,
    description: "Chatea y envia imagenes",
    Icon: HiHashtag,
  },
  {
    label: "Voz",
    value: ChannelTypeEnum.VIDEO,
    description: "Comunicate por voz y video",
    Icon: HiSpeakerWave,
  },
];

export const CreateChannel: React.FC = () => {
  return (
    <ModalTemplate identificator="CreateChannel">
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
        Crear canal
      </p>
    </div>
  );
};

const ModalForm = () => {
  const { selected_server:{id} } = useServer();

  const { register, isLoading, onSubmit, setValue } =
    useCustomFormModalID(create_channel,id);

  const {isLoading:isLoadingCategories,fecthData} = useFetchID({api_function:get_all_category})

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [categories, setCategories] = useState<Option[]>([]);

  const handleOptionChange = (value: string) => {
    setValue("type", value);
    setSelectedOption(value);
  };

  useEffect(()=>{    
    const fetcher = async ()=>{
      const data = await fecthData(id)
      setCategories(data)
    }
    fetcher()
  },[])

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center w-full px-1 overflow-y-auto gap-9"
    >
      <div className="w-[320px] ">
        <InputsForms
          title="Nombre del canal"
          register={register}
          name="name"
          placeholder="Nombre del canal"
        />
      </div>

      <SelectInput
        StrokeIcon={false}
        name="CategoryID"
        Icon={BiSolidCategory}
        text={"Categoria"}
        required
        setValue={setValue}
        options={categories}
        placeholder={"Categorias"}
      />

      <RadioInput
        title="Tipo de canal"
        options={options}
        name="exampleOptions"
        selectedValue={selectedOption}
        onChange={handleOptionChange}
      />
      
      <div className="w-[320px] ">
        <SubmitButton text="Crear" isLoading={isLoading || isLoadingCategories} />
      </div>

    </form>
  );
};

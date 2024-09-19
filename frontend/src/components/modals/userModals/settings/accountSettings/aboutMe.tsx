import { TextArea } from "../../../../forms/Inputs/TextArea";
import { SubmitButton } from "../../../../forms/Inputs/Button";
import { FaFaceSmileWink } from "react-icons/fa6";

import { ModalTemplate } from "../../../ModalTemplate";

import { useState, useEffect } from "react";
import { get_profile } from "../../../../../api/auth";
import { edit_about_me } from "../../../../../api/user_info";
import { useCustomFormModal } from "../../../../../hooks/useFormModal";

export const EditAboutMeModal: React.FC = () => {
    return (
        <ModalTemplate identificator="aboutMe">
            <AboutMeForm />
        </ModalTemplate>

    )
}

export const AboutMeForm: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<Usuario>();

  const id = fetchedData?.id ? fetchedData.id : ""

  const api_function = (data: any) => {
      edit_about_me(id, data)
  }

  const { onSubmit, register, isLoading } = useCustomFormModal(api_function);

  useEffect(() => {
      const fetch = async () => {
          const fetchData = await get_profile();
          setFetchedData(fetchData);
      }
      fetch();
  }, [])
  
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-10">
        <div className="flex flex-row items-center justify-center gap-5 p-4">
          <FaFaceSmileWink className="text-4xl text-custom_white" />
          <p className="text-2xl text-custom_white">Cuéntanos sobre ti</p>
        </div>
  
        <div className="mx-auto">
          <form onSubmit={onSubmit} className="flex flex-col items-center gap-10">
            <TextArea
              placeholder="¡Añade una descripción genial sobre ti!"
              name="about"
              register={register}
              inputValue={fetchedData?.about}
            />
  
            <SubmitButton text="Guardar" isLoading={isLoading} />
          </form>
        </div>
      </div>
    );
  };
  
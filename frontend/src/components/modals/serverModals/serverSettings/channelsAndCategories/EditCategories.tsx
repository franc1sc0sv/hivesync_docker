import { useEffect, useState } from "react";

import { ModalTemplate } from "../../../ModalTemplate";

import { CategoryIcon } from "../../../../Icons/category";

import { useFetchID } from "../../../../../hooks/useFecthID";
import { useStoreId } from "../../../../../store/useStoreId";

import { get_category, patch_category } from "../../../../../api/server";

import { useCustomFormModalID } from "../../../../../hooks/useFormModalID";
import { InputsForms } from "../../../../forms/Inputs/inputs";
import { SubmitButton } from "../../../../forms/Inputs/Button";
import { LoadingPage } from "../../../../routes/loadingPage";

export const EditCategories: React.FC = () => {
  return (
    <ModalTemplate identificator="EditCategoriesModal">
      <div className="flex flex-col h-full gap-5">
        <Header />
        <ModalForm />
      </div>
    </ModalTemplate>
  );
};

const Header: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <CategoryIcon size={40} color="#fff" />
      <p className="text-2xl text-custom_white">Editar categoria</p>
    </div>
  );
};

const ModalForm = () => {
  const { id: id_category } = useStoreId();
  const { fecthData, isLoading } = useFetchID({
    api_function: get_category,
  });
  const [category, setCategory] = useState<Option | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      const data = await fecthData(id_category);
      setCategory(data.categorie);
    };
    fetcher();
  }, []);

  if (isLoading || !category?.id) return <LoadingPage />;

  return <Form categorie={category as Option} />;
};

const Form = ({ categorie }: { categorie: Option }) => {
  console.log(categorie.id);
  const { register, isLoading, onSubmit } = useCustomFormModalID(
    patch_category,
    categorie.id,
    {
      name: categorie.name,
    }
  );

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

      <SubmitButton text="Actualizar" isLoading={isLoading} />
    </form>
  );
};

import { useModal } from "../../../../../store/useModal";
import { ModalTemplate } from "../../../ModalTemplate";
import { CategoryIcon } from "../../../../Icons/category";
import { useFetchID } from "../../../../../hooks/useFecthID";
import { useEffect, useState } from "react";
import { get_all_category } from "../../../../../api/server";
import { useServer } from "../../../../layouts/ServerLayout/hooks/useServer";
import { LoadingPage } from "../../../../routes/loadingPage";
import { useStoreId } from "../../../../../store/useStoreId";

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export const ManageCategories: React.FC = () => {
  return (
    <ModalTemplate identificator="manageCategories">
      <div className="flex flex-col gap-5">
        <Header />
        <CategoriesList />
      </div>
    </ModalTemplate>
  );
};

const Header: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full gap-2">
      <CategoryIcon size={40} color="#fff" />
      <p className="text-2xl text-custom_white">Gestionar Categorias</p>
    </div>
  );
};

const CategoriesList = () => {
  const {
    selected_server: { id },
  } = useServer();
  const { isLoading, fecthData } = useFetchID({
    api_function: get_all_category,
  });
  const [categories, setCategories] = useState<Option[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const data = await fecthData(id);
      setCategories(data);
    };
    fetcher();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex flex-col gap-3 p-3 bg-overlay_2 rounded-xl">
      <ContainerComponent categories={categories} />
    </div>
  );
};

const ContainerComponent = ({ categories }: { categories: Option[] }) => {
  return categories.map((option, i: number) => (
    <CategorieComponent option={option} key={i} />
  ));
};

const CategorieComponent = ({ option }: { option: Option }) => {
  const { setID } = useStoreId();
  const { setModalId } = useModal();

  const HandleEdit = () => {
    setID(option.id);
    setModalId("EditCategoriesModal");
  };

  const HandleDelete = () => {
    setID(option.id);
    setModalId("DeleteCategoriesModal");
  };

  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2 ">
        <div className="w-8 h-8 p-3 rounded-full bg-primary"></div>
        <p className="text-custom_white">{option.name}</p>
      </div>
      <div className="flex gap-2">
        <MdEdit onClick={HandleEdit} color="white" size={24} />
        <MdDelete onClick={HandleDelete} color="white" size={24} />
      </div>
    </div>
  );
};

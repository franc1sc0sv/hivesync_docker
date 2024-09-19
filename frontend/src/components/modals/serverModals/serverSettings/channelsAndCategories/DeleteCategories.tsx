import { ModalTemplate } from "../../../ModalTemplate";
import { CategoryIcon } from "../../../../Icons/category";
import { useStoreId } from "../../../../../store/useStoreId";
import { delete_category } from "../../../../../api/server";

import { LoadingPage } from "../../../../routes/loadingPage";
import { SadFaceIcon } from "../../../../Icons/sadFace";
import { CustomizedButton } from "../../../../buttons/customizedButton";
import { useToogleAPI } from "../../../../../hooks/useToogleAPI";
import { useModal } from "../../../../../store/useModal";

export const DeleteCategoriesModal: React.FC = () => {
  return (
    <ModalTemplate identificator="DeleteCategoriesModal">
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
      <p className="text-2xl text-custom_white">Eliminar categoria</p>
    </div>
  );
};

const ModalForm = () => {
  const { id: id_category } = useStoreId();
  const { setModalId } = useModal();
  const { isLoading, onSubmit } = useToogleAPI({
    api_function: delete_category,
  });

  const handleConfirm = async () => {
    await onSubmit(id_category);
  };
  const handleCancel = () => {
    setModalId("");
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex flex-col w-full h-full gap-5 p-3">
      <div className="flex flex-col items-center justify-start w-full gap-3">
        <SadFaceIcon size={50} color="white" />
        <p className="text-2xl text-center text-custom_white">
          ¿Estás seguro de que quieres eliminar esta categoria?
        </p>
        <p className="text-center text-custom_white">
          Los canales de texto y video de esta categoria se eliminaran
        </p>
      </div>

      <div className="flex flex-row justify-between w-full gap-5">
        <CustomizedButton
          text="Confirmar"
          color="#9333ea"
          displayIcon={false}
          onAction={handleConfirm}
        />
        <CustomizedButton
          text="Cancelar"
          color="#382C6C"
          displayIcon={false}
          onAction={handleCancel}
        />
      </div>
    </div>
  );
};

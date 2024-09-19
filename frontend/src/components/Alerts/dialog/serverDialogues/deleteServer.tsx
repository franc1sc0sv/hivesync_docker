import { DialogueTemplate } from "../dialogueModalTemplate";
import { useModal } from "../../../../store/useModal";
import { SadFaceIcon } from "../../../Icons/sadFace";
import { useServer } from "../../../layouts/ServerLayout/hooks/useServer";
import { delete_server } from "../../../../api/server";
import { useNavigate } from "react-router-dom";

export const DeleteServerDialogue: React.FC = () => {
  const {selected_server} = useServer();
  const { setModalId } = useModal();
  const navigate = useNavigate();

  const accept = async () => {
    await delete_server(selected_server.id);
    setModalId("");
    navigate(0);
  };

  return (
    <DialogueTemplate
      onAccept={accept}
      identificator="delete_server">
      <Dialogue />
    </DialogueTemplate>
  );
};

const Dialogue: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full gap-5 p-3">
      <div className="flex flex-col items-center justify-start w-full gap-3">
        <SadFaceIcon size={50} color="white" />
        <p className="text-2xl text-center text-custom_white">
          ¿Estás seguro de que quieres eliminar el servidor?
        </p>
      </div>
    </div>
  );
};

import { ModalTemplate } from "../../ModalTemplate";
import { AddStatusModal } from "./AddStatusModal";

export const AddSta: React.FC = () => {
  return (
    <div>
      <ModalTemplate identificator="añadirEstado">
        <div className="flex items-center justify-center h-full">
          <AddStatusModal />
        </div>
      </ModalTemplate>
    </div>
  );
};

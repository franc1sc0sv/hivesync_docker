import { PencilIcon } from "../Icons/pencil";
import { FaceSmilinIcon } from "../Icons/faceSmiling";

import { useModal } from "../../store/useModal";

interface EditOptionProps {
  title: string;
  option: boolean;
  modalId: string;
}

export const EditProfileOption: React.FC<EditOptionProps> = ({
  title,
  option,
  modalId,
}) => {
  const { setModalId } = useModal();
  return (
    <div
      className="flex items-center justify-center gap-3 px-5 py-2 border border-white max-w-full bg-overlay_2 text-custom_white rounded-3xl"
      onClick={() => setModalId(modalId)}
    >
      {option ? (
        <FaceSmilinIcon size={20} color="white" />
      ) : (
        <PencilIcon size={25} color="white" />
      )}
      <p className="text-md">{title}</p>
    </div>
  );
};

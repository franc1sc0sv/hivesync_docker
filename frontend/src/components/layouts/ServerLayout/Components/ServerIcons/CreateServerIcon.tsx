import { FaPlus } from "react-icons/fa";
import { useModal } from "../../../../../store/useModal";

export const CreateServerIcon: React.FC = ({}) => {
  const { setModalId } = useModal();

  return (
    <div
      onClick={() => {
        setModalId("createServer");
      }}
      className={` font-almarai rounded-full w-14 h-14 text-4xl bg-primary grid place-items-center cursor-pointer`}
    >
      <FaPlus color="white" size={28} />
    </div>
  );
};

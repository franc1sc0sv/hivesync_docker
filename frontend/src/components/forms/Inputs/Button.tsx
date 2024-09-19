import { RiArrowRightSLine } from "react-icons/ri";
import BeatLoader from "react-spinners/BeatLoader";

interface PurpleInputProps {
  text: string;
  isLoading: boolean;
}

export const SubmitButton: React.FC<PurpleInputProps> = ({
  text,
  isLoading,
}) => {
  const stylesIsloading = isLoading ? "justify-center" : "justify-between";
  return (
    <button
      disabled={isLoading}
      type="submit"
      className={`flex items-center ${stylesIsloading} h-14 w-full p-3 font-bold bg-primary rounded-xl text-custom_white font-almarai mx-auto`}
    >
      {isLoading ? (
        <BeatLoader color="white" />
      ) : (
        <>
          <p>{text}</p>
          <RiArrowRightSLine size={28} />
        </>
      )}
    </button>
  );
};

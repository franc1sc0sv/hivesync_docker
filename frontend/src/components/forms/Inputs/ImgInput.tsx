import { AiFillPicture } from "react-icons/ai";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  text: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  status: () => void;
}

export const ImgInput: React.FC<InputProps> = ({
  text,
  name,
  register,
  status,
}) => {
  return (
    <div className="flex items-center justify-center w-full text-custom_white">
      <label
        htmlFor="dropzone-file"
        className="w-full h-64 flex flex-col items-center justify-center border-4 border-dashed rounded-lg cursor-pointer border-custom_white bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center gap-2 p-5">
          <AiFillPicture size={80} />
          <p className="text-lg text-gray-500 font-almarai dark:text-gray-400">
            {text}
          </p>
        </div>

        <input
          {...register(name)}
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={status}
        />
      </label>
    </div>
  );
};

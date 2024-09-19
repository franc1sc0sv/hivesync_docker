import { FieldValues, UseFormRegister } from "react-hook-form";

type InputInformation = {
  title: string;
  placeholder: string;
  type?: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  inputValue?: string
};

export const InputsForms: React.FC<InputInformation> = ({
  title,
  placeholder,
  type = "text",
  register,
  name,
  inputValue
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <p className="text-xl font-bold text-custom_white font-almarai">
        {title}
      </p>
      
      <input
        {...register(name)}
        className="w-full p-3 transition duration-300 bg-overlay_2 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary focus:border-primary text-custom_white"
        type={type}
        placeholder={placeholder}
        defaultValue={inputValue}
      />
    </div>
  );
};

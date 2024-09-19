import { FieldValues, UseFormRegister } from "react-hook-form";

import { SearchIcon } from "../../Icons/search";

interface SearchProps {
  placeholder: string;
  bg_color?: string;
  name: string;
  register: UseFormRegister<FieldValues>;
}

export const SearchBar: React.FC<SearchProps> = ({
  register,
  name,
  placeholder,
  bg_color = "bg-overlay_2",
}) => {
  return (
    <div className="relative w-full mx-auto">
      <input
        {...register(name)}
        placeholder={placeholder}
        type="text"
        className={`${bg_color} w-full px-5 py-3 pr-10 transition duration-300 rounded-overlay  border-primary-500 placeholder-custom_white text-custom_white focus:outline-none focus:ring-4 focus:ring-primary focus:border-primary placeholder:font-amiko placeholder:text-gray`}
      />

      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <button type="submit">
          <SearchIcon size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

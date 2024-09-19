import React from "react";
import { IconType } from "react-icons";

type Option = {
  label: string;
  value: string;
  description: string;
  Icon: IconType;
};

interface RadioInputProps {
  options: Option[];
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
  title: string;
}
interface RadioInput {
  option: Option;
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  options,
  name,
  selectedValue,
  onChange,
  title,
}) => {
  return (
    <div className="flex gap-2 flex-col w-full max-w-[320px] text-white">
      <p className="text-xl font-bold text-custom_white font-almarai ">
        {title}
      </p>
      {options.map((option, i) => (
        <div key={i} className="flex items-center justify-between w-full gap-4">
          <ItemLabel option={option} />
          <Input
            name={name}
            onChange={onChange}
            option={option}
            selectedValue={selectedValue}
          />
        </div>
      ))}
    </div>
  );
};

const Input: React.FC<RadioInput> = ({
  option,
  name,
  selectedValue,
  onChange,
}) => {
  return (
    <>
      <label
        key={option.value}
        className="relative flex items-center p-3 rounded-full cursor-pointer"
        htmlFor="html"
      >
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={() => onChange(option.value)}
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
          id="html"
        />
        <IconCircle />
      </label>
    </>
  );
};

const ItemLabel = ({ option }: { option: Option }) => {
  const { Icon, label, description } = option;
  return (
    <div className="flex items-center gap-3">
      <Icon size={28} />
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold text-white">{label}</p>
        <p className="text-sm text-gray">{description}</p>
      </div>
    </div>
  );
};

const IconCircle = () => {
  return (
    <span className="absolute text-white text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
      </svg>
    </span>
  );
};

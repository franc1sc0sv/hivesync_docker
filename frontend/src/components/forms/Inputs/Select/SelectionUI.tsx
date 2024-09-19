import { IoIosArrowForward } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useSelect } from "./useSelector";
import React, { useEffect } from "react";

const initialAnimation = { opacity: 0 };
const animateAnimation = { opacity: 1 };
const exitAnimation = { opacity: 0 };

export const SelectionInput: React.FC<PropsSelect> = ({
  name = "",
  text = "",
  placeholder = "",
  Icon,
  StrokeIcon = false,
  options = [],
  setValue
}) => {
  const { value, setShowOptions, showOptions } = useSelect();

  const IconStyles = StrokeIcon
    ? "fill-white stroke-dark stroke-1"
    : "fill-dark";
  const openStylesArrow = showOptions && "bg-dark !fill-white rotate-90";

  const handleClick = () => {
    setShowOptions((prev) => !prev);
  };

  useEffect(() => {
    if (!value.id) return;
    setValue(name, value.id);
  }, [value]);

  return (
    <div className="flex flex-col w-full max-w-[320px] gap-3 font-almarai  ">
      <p className="text-xl font-bold text-custom_white ">{text}</p>
      <div
        className="relative w-full p-2 cursor-default rounded-overlay bg-overlay_2 "

      >
        <p className="w-full max-w-lg truncate ... py-2 rounded-lg text-body px-14 text-gray">
          {value.name === "" ? placeholder : value.name}
        </p>
        <Options show={showOptions} options={options} />

        <IoIosArrowForward
          size={28}
          onClick={handleClick}
          className={`absolute right-5 top-1/2 translate-y-[-50%] cursor-pointer fill-white rounded-full p-1 fill-dark transition-all duration-200 ${openStylesArrow}`}
        />
        <Icon
          size={28}
          className={`absolute fill-white left-5 top-1/2 translate-y-[-50%]  ${IconStyles}`}
        />
      </div>
    </div>
  );
};

const Options = ({ options, show }: { options: Options; show: boolean }) => {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          key={Number(show)}
          className="absolute z-50 flex flex-col w-full gap-5 p-4 text-white rounded-lg shadow-xl bg-overlay_2 "
          initial={initialAnimation}
          animate={animateAnimation}
          exit={exitAnimation}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          {options.map((x, i) => (
            <Option key={i} option={x} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Option = ({ option }: { option: Option }) => {
  const { setValue, setShowOptions } = useSelect();
  const { name } = option;

  const handleClick = () => {
    setShowOptions(false);
    setValue(option);
  };

  return (
    <p
      onClick={handleClick}
      className="p-2 truncate transition-all rounded-lg cursor-pointer hover:bg-dark hover:text-white"
    >
      {name}
    </p>
  );
};

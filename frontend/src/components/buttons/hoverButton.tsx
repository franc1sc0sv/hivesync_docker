import React from "react";

interface ButtonHoverProp {
  children: React.ReactNode;

  handleClick?: () => void;
}

export const ButtonHover: React.FC<ButtonHoverProp> = ({
  children,

  handleClick = () => {},
}) => {
  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center rounded-overlay bg-overlay_2 w-[3rem] h-[3rem] p-4 transition-colors duration-300 ease-in-out`}
    >
      {children}
    </div>
  );
};

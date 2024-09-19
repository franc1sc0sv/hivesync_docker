import React from "react";

const Button = ({
  disabled = false,
  children,
  color,
  customBg,
  border,
  textColor,
  onClick = () => {},
  rounded,
  className,
}: any) => {
  let colorBoton = "bg-primary ";
  let borderBoton = "border-transparent";
  let color_text = "";
  let roundedBoton = "";
  let disabledStyles = "";

  if (disabled) {
    disabledStyles = "focus:outline-none opacity-50 bg-opacity-60";
  }

  if (rounded) {
    roundedBoton = `!rounded-full`;
  }

  if (color == "rojo") {
    colorBoton = "bg-red-700 hover:bg-red-800";
  }
  if (color == "verde") {
    colorBoton = "bg-green-700 hover:bg-green-800";
  }
  if (color == "blanco") {
    colorBoton = "bg-white !text-black";
  }
  if (color == "morado") {
    colorBoton = "bg-primary";
  }

  if (border == "negro") {
    borderBoton = "border-black";
  }
  if (border == "blanco") {
    borderBoton = "border-white";
  }

  if (textColor == "blanco") {
    color_text = "!text-white";
  }
  if (textColor == "azul") {
    color_text = "!text-primary";
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={customBg && { backgroundColor: customBg }}
      className={`text-white shadow-md w-full flex justify-center items-center gap-4 disabled:hover:scale-100 transition-all rounded-lg p-2 font-bold border ${colorBoton} ${borderBoton} ${color_text} ${roundedBoton} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

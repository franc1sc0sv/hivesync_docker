import { IoExitOutline } from "react-icons/io5";
import { IconProps } from "./types/iconProps";

export const ExitIcon: React.FC<IconProps> = ({ size, color }) => {
  return <IoExitOutline size={size} fill={color} />;
};

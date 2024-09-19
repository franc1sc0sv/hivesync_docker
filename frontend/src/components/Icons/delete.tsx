import { MdDelete } from "react-icons/md";
import { IconProps } from "./types/iconProps";

export const DeleteIcon: React.FC<IconProps> = ({ size, color }) => {
  return <MdDelete size={size} fill={color} />;
};

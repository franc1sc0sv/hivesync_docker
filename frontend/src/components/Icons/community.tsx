import { VscGroupByRefType } from "react-icons/vsc";
import { IconProps } from "./types/iconProps";

export const Community: React.FC<IconProps> = ({ size, color }) => {
  return <VscGroupByRefType size={size} fill={color} />;
};

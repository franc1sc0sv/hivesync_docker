import { FaLock } from "react-icons/fa";
import { IconProps } from "./types/iconProps";

export const PadlockIcon: React.FC<IconProps> = ({ size, color }) => {
  return <FaLock size={size} fill={color} />;
};

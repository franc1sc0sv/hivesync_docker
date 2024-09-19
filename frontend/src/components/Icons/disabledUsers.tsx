import { FaUsersSlash } from "react-icons/fa";
import { IconProps } from "./types/iconProps";

export const DisabledUsersIcon: React.FC<IconProps> = ({ size, color }) => {
  return <FaUsersSlash size={size} fill={color} />;
};

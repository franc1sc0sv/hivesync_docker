import { HiUser } from "react-icons/hi";

import { IconProps } from "./types/iconProps";

export const UserIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <HiUser size={size} fill={color} />
    );
};
import { HiUserGroup } from "react-icons/hi";

import { IconProps } from "./types/iconProps";

export const UsersGroupIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <HiUserGroup size={size} fill={color} />
    );
};
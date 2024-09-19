import { HiUserGroup } from "react-icons/hi";

import { IconProps } from "./types/iconProps";

export const ServersGroupIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <HiUserGroup size={size} fill={color} />
    );
};
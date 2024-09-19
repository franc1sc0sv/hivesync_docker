import { HiUserAdd } from "react-icons/hi";

import { IconProps } from "./types/iconProps";

export const UserAddIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <HiUserAdd size={size} fill={color} />
    );
};  
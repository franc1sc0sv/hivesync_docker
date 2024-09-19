import { HiMiniBell } from "react-icons/hi2";

import { IconProps } from "./types/iconProps";

export const BellIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <HiMiniBell size={size} fill={color} />
    );
};
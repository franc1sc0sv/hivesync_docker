import { HiCog } from "react-icons/hi";

import { IconProps } from "./types/iconProps";

export const SettingsIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <HiCog size={size} fill={color} />
    );
};
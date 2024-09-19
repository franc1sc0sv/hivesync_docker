import { HiShieldCheck } from "react-icons/hi";

import { IconProps } from "./types/iconProps";

export const ShieldIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <HiShieldCheck size={size} fill={color} />
    );
};
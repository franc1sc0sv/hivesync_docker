import { FaClock } from "react-icons/fa6";

import { IconProps } from "./types/iconProps";

export const ClockIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <FaClock size={size} fill={color} />
    );
};
import { FaTasks } from "react-icons/fa";

import { IconProps } from "./types/iconProps";

export const TaskIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <FaTasks size={size} fill={color} />
    );
};
import { IoIosWarning } from "react-icons/io";

import { IconProps } from "./types/iconProps";

export const WarningIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <IoIosWarning size={size} fill={color} />
    );
};
import { HiSave } from "react-icons/hi";

import { IconProps } from "./types/iconProps";

export const PhoneIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        < HiSave size={size} fill={color} className=""/>
    );
};
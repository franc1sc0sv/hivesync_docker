import { FaPhoneSlash } from "react-icons/fa6";

import { IconProps } from "./types/iconProps";

export const PhoneIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        < FaPhoneSlash size={size} fill={color} className=""/>
    );
};
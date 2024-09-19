import { BsTelephoneFill } from "react-icons/bs";

import { IconProps } from "./types/iconProps";

export const PhoneIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <BsTelephoneFill size={size} fill={color} />
    );
};
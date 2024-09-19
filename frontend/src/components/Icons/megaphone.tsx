import { IoMdMegaphone } from "react-icons/io";

import { IconProps } from "./types/iconProps";

export const MegaphoneIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <IoMdMegaphone size={size} fill={color} />
    );
};
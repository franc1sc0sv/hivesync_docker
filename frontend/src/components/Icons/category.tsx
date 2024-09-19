import { BiSolidCategory } from "react-icons/bi";

import { IconProps } from "./types/iconProps";

export const CategoryIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <BiSolidCategory size={size} fill={color} />
    );
};
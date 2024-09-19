import { IoMdAddCircle } from "react-icons/io";

import { IconProps } from "./types/iconProps";

export const AddIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <IoMdAddCircle size={size} fill={color} />
    );
};
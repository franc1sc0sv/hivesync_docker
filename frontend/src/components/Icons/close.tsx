import { IoMdClose } from "react-icons/io";

import { IconProps } from "./types/iconProps";

export const CloseIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <IoMdClose size={size} fill={color} />
    );
};
import { IoSend } from "react-icons/io5";

import { IconProps } from "./types/iconProps";

export const SendIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <IoSend size={size} fill={color} />
    );
};
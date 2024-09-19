import { FaPaperclip } from "react-icons/fa6";

import { IconProps } from "./types/iconProps";

export const ClipIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <FaPaperclip size={size} fill={color} />
    );
};
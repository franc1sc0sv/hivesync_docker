import { AiFillFileAdd } from "react-icons/ai";

import { IconProps } from "./types/iconProps";

export const FileIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <AiFillFileAdd size={size} fill={color} />
    );
};
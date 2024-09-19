import { MdCreateNewFolder } from "react-icons/md";

import { IconProps } from "./types/iconProps";

export const FolderIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <MdCreateNewFolder size={size} fill={color} />
    );
};
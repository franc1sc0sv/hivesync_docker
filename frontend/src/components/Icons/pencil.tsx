import { HiPencil } from "react-icons/hi";

import { IconProps } from "./types/iconProps";

export const PencilIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <HiPencil size={size} fill={color} />
    );
};
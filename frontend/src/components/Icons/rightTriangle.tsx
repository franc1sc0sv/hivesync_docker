import { HiChevronRight } from "react-icons/hi2";

import { IconProps } from "./types/iconProps";

export const RightTriangleIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <HiChevronRight size={size} fill={color} />
    );
};
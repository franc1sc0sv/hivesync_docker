import { MdOutlineArrowBackIos } from "react-icons/md";

import { IconProps } from "./types/iconProps";

export const GoBackTriangle: React.FC<IconProps> = ({size, color}) => {
    return (
        <MdOutlineArrowBackIos size={size} fill={color} />
    );
};
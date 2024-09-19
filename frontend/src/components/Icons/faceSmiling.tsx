import { FaFaceSmileWink } from "react-icons/fa6";

import { IconProps } from "./types/iconProps";

export const FaceSmilinIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <FaFaceSmileWink size={size} fill={color} />
    );
};
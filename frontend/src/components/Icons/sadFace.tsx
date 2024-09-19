import { FaFaceFrown } from "react-icons/fa6";

import { IconProps } from "./types/iconProps";

export const SadFaceIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <FaFaceFrown size={size} fill={color} />
    );
};
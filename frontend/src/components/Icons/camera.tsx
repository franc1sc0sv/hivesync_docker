import { HiMiniVideoCamera } from "react-icons/hi2";

import { IconProps } from "./types/iconProps";

export const CameraIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <HiMiniVideoCamera size={size} fill={color} />
    );
};
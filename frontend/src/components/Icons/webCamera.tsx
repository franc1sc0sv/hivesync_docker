import { PiVideoCameraFill } from "react-icons/pi";

import { IconProps } from "./types/iconProps";

export const WebCameraIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <PiVideoCameraFill size={size} fill={color} />
    );
};
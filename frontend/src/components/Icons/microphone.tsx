import { FaMicrophone } from "react-icons/fa6";

import { IconProps } from "./types/iconProps";

export const MicrophoneIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <FaMicrophone size={size} fill={color} />
    );
};
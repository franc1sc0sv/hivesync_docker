import { AiFillPicture } from "react-icons/ai";

import { IconProps } from "./types/iconProps";

export const PictureIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <AiFillPicture size={size} fill={color} />
    );
};
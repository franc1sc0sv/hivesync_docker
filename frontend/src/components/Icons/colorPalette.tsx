import { IoIosColorPalette } from "react-icons/io";

import { IconProps } from "./types/iconProps";

export const ColorPaletteIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <IoIosColorPalette size={size} fill={color} />
    );
};
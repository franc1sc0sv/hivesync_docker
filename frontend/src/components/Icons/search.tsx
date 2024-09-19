import { IoSearch } from "react-icons/io5";

import { IconProps } from "./types/iconProps";

export const SearchIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <IoSearch size={size} fill={color} />
    );
};
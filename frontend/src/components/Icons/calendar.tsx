import { HiCalendarDays } from "react-icons/hi2";

import { IconProps } from "./types/iconProps";

export const CalendarIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <HiCalendarDays size={size} fill={color} />
    );
};
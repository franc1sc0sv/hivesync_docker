import { FaCircleCheck } from "react-icons/fa6";

import { IconProps } from "./types/iconProps";

export const CheckIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <FaCircleCheck size={size} fill={color} />
    );
};
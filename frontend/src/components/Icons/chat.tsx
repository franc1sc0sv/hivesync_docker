import { HiChatBubbleLeftRight} from "react-icons/hi2";

import { IconProps } from "./types/iconProps";

export const ChatIcon: React.FC<IconProps> = ({size, color}) => {
    return (
        <HiChatBubbleLeftRight size={size} fill={color} />
    );
};
import { BUTTON_TYPE } from "./enum";
import { IconType } from "react-icons";

export type UserCardType = {
    user: string;
    userId: string;
    userImageUrl: string;
    userColor: string;
  };
  
  export interface UserCardProps {
    users: UserCardType[];
  }
  export type ButtonCallsProps = {
    type: BUTTON_TYPE;
    onClick: () => void;
    Icon: IconType;
  };
  
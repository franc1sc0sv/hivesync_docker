import { IconType } from "react-icons";

type Links = {
  Icon: IconType;
  url: string;
};

type ArrayLinks = Links[];

type PropsProfilePicture = {
  url: string;
};

interface PropsLinks {
  links: ArrayLinks;
}

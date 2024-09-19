import { NavBar } from "./Components/NavBar";
import { Header } from "./Components/UserHeader";
import { HiUserGroup } from "react-icons/hi";
import { HiChatBubbleLeftRight, HiMiniBell } from "react-icons/hi2";

import { ArrayLinks } from "./types/GeneralLayout";

//mock

type PropsGeneralLayout = {
  title?: string;
  RightComponent?: React.FC;
  showHeader?: boolean;
  children?: React.ReactNode;
};

export const get_last_server = () => {
  const categories = localStorage.getItem("lastserver") || "/app/";
  return categories;
};

export const GeneralLayout: React.FC<PropsGeneralLayout> = ({
  title = "Mensajes",
  RightComponent = () => <></>,
  children,
  showHeader = true,
}) => {
  const links: ArrayLinks = [
    {
      Icon: HiUserGroup,
      url: get_last_server(),
    },
    {
      Icon: HiChatBubbleLeftRight,
      url: "/app/@me",
    },
    {
      Icon: HiMiniBell,
      url: "/app/@notifications",
    },
  ];

  return (
    <main className="flex flex-col md:flex-row-reverse w-full max-h-screen gap-5 p-5 overflow-hidden bg-overlay_1">
      <section className="flex flex-col w-full gap-5 h-screen">
        {showHeader && <Header title={title} RightComponent={RightComponent} />}
        {children}
      </section>
      <NavBar links={links} />
    </main>
  );
};

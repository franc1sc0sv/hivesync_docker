import { NavLink } from "react-router-dom";

import { Links, PropsLinks, PropsProfilePicture } from "../types/GeneralLayout";
import { Link } from "react-router-dom";
import { UserAvatar } from "../../../Avatars/UserAvatar";
import { get_profile } from "../../../../api/auth";
import { useEffect, useState } from "react";

export const NavBar: React.FC<PropsLinks> = ({ links }) => {
  return (
    <nav className="w-full lg:h-[95vh] md:w-[10%] lg:w-[7%] xl:w-[5%] flex flex-row md:flex-col items-center justify-around py-3 mx-auto rounded-overlay bg-overlay_2">
      <LinksNav links={links} />
      <UserProfile url="/app/profile" />
    </nav>
  );
};

const LinksNav: React.FC<PropsLinks> = ({ links }) => {
  return links.map((link, i) => {
    return <LinkNavBar key={i} Icon={link.Icon} url={link.url} />;
  });
};

const LinkNavBar: React.FC<Links> = ({ Icon, url }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `${isActive ? "text-white" : "text-gray"} hover:text-custom_white transition-all duration-300`
      }
      to={`${url}`}
    >
      <Icon size={40} className="text-3xl" />
    </NavLink>
  );
};

const UserProfile: React.FC<PropsProfilePicture> = ({ url }) => {
  const [user, setUser] = useState<Usuario>();

  useEffect(() => {
    const fetch = async () => {
      const fetchData = await get_profile();
      setUser(fetchData);
    }
    fetch();
  }, []);

  return (
    <Link to={url} className="flex flex-shrink-0">
      <UserAvatar
        profileURl={user?.profileUrl as string}
        username={user?.username as string}
        w={3}
        h={3}
        fontSize={2}
      />
    </Link>
  );
};

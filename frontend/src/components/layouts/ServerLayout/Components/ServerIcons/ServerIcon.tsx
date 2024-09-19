import { Link } from "react-router-dom";
import { ServerInfoIcons } from "../../types/server";

interface PropsServerIcons extends ServerInfoIcons {
  isFolder?: boolean;
}

export const ServerIcon: React.FC<PropsServerIcons> = ({
  active,
  avatarURL,
  url,
  name,
  isFolder = false,
}) => {
  const isIconUrlEmpty = avatarURL.length === 0;
  const firstLetterName = name[0].toUpperCase();

  const imgBG = !isIconUrlEmpty ? `url(${avatarURL})` : "";
  const borderStyleActive = active ? "rounded-xl" : "rounded-full";
  const letterIconStyles = isIconUrlEmpty
    ? "text-white bg-secondary font-medium"
    : "";
  const folderStyles = isFolder ? "w-5 h-5 text-sm " : "w-14 h-14  text-4xl";

  return (
    <Link
      to={url}
      style={{ backgroundImage: imgBG }}
      className={` font-exo lowercase overflow-hidden  grid place-items-center ${folderStyles} ${borderStyleActive} ${letterIconStyles} `}
    >
      {isIconUrlEmpty && firstLetterName}
    </Link>
  );
};

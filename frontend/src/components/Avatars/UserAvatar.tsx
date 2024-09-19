export const UserAvatar: React.FC<AvatarProps> = ({
  w = 7,
  h = 7,
  fontSize = 3.75,
  username = "A",
  profileURl = "",
}) => {
  const firstLetterName = username[0].toUpperCase();

  return (
    <div
      style={{
        height: `${h}rem`,
        width: `${w}rem`,
        fontSize: `${fontSize}rem`,
      }}
      className="grid overflow-hidden font-medium text-white font-exo place-items-center rounded-2xl bg-secondary"
    >
      {profileURl !== "" ? (
        <img
          className="object-cover object-center w-full h-full"
          src={profileURl}
          alt="avatar"
        />
      ) : (
        firstLetterName
      )}
    </div>
  );
};

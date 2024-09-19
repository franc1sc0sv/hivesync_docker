import { formatDate } from "../../../helpers/date";
import { ModalTemplate } from "../ModalTemplate";

export const ExternalProfilePublicModal = ({ user }: { user: UserProfile }) => {
  return (
    <ModalTemplate identificator="profilePublic">
      <Profile user={user} />
    </ModalTemplate>
  );
};

const Profile = ({ user }: { user: UserProfile }) => {
  return (
    <div className="flex flex-col w-full gap-5 h-4/5">
      <Cover user={user} />
      <About user={user} />
    </div>
  );
};

const Cover = ({ user }: { user: UserProfile }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="max-w-2xl text-gray-900 rounded-lg sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto">
        <div
          style={{ backgroundColor: user.backgroundUrl }}
          className="relative overflow-hidden rounded-xl h-36 "
        ></div>
        <div className="absolute ml-5 -mt-20 overflow-hidden w-28 h-28 md:mx-auto rounded-2xl">
          <img
            className="object-cover object-center w-full h-full"
            src={user.profileUrl}
            alt="Profile picture"
          />
        </div>
      </div>
    </div>
  );
};

const About = ({ user }: { user: UserProfile }) => {
  const formated_date = formatDate(user.createdAt);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 p-3 mt-10 rounded-lg bg-overlay_2">
        <div className="flex flex-col gap-1">
          <p className="text-2xl text-left text-custom_white">{user.name}</p>
          <p className="text-sm text-left text-gray">{user.username}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-3 rounded-lg bg-overlay_2">
        <div className="flex flex-col text-custom_white">
          <h3 className="text-lg text-left">Sobre {user.name} </h3>
          <p className="text-left text-gray">{user.about}</p>
        </div>

        <div className="flex flex-col text-custom_white">
          <h3 className="text-lg text-left">Miembro de HiveSync desde </h3>
          <p className="text-left text-gray">{formated_date}</p>
        </div>
      </div>
    </div>
  );
};

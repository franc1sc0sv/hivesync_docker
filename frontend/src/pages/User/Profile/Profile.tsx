import { ProfileCover } from "./Components/Cover";
import { UserInformation } from "./Components/UserInformation";
import { GeneralLayout } from "../../../components/layouts/GeneralLayout/GeneralLayout";
import { get_profile } from "../../../api/auth";
import { useEffect, useState } from "react";
import { LoadingPage } from "../../../components/routes/loadingPage";

export const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<Usuario>();

    useEffect(() => {
        const fetch = async () => {
            const fetchData = await get_profile();
            setUser(fetchData);
        }
        fetch();
    }, []);

    if (!user) return <LoadingPage />

  return (
    <GeneralLayout showHeader={false}>
      <section className="flex flex-col justify-around w-full h-full">
        <ProfileCover
          backgroundUrl={user?.backgroundUrl as string}
          profileUrl={user?.profileUrl as string}
          username={user?.username as string}
        />
        <UserInformation user={user} />
      </section>
    </GeneralLayout>
  );
};

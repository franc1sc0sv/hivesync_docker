import { ReactNode, useEffect, useState } from "react";
import { get_profile } from "../../api/auth";
import { useSession } from "../../store/user";
import { LoadingPage } from "../routes/loadingPage";

export const SessionDetector = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useSession();
  const perfil = async () => {
    try {
      setLoading(true);
      const res = await get_profile();
      setUser(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    perfil();
  }, []);

  if (loading) return <LoadingPage />;

  return <>{children}</>;
};

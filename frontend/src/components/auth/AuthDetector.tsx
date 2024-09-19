import { Outlet } from "react-router-dom";
import { useSession } from "../../store/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthDetector: React.FC = () => {
  const { user } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.id) {
      navigate("/");
    }
  }, []);
  return <Outlet />;
};

import { useNavigate } from "react-router-dom";
import { Community } from "../../../Icons/community";

export const CommunityButton: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/app/communities");
  };
  return (
    <div
      className="grid w-auto rounded-full cursor-pointer font-almarai h-14 bg-primary place-items-center aspect-square"
      onClick={handleClick}
    >
      <Community size={28} color={"#ffffff"} />
    </div>
  );
};

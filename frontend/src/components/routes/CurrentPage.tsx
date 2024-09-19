import { useEffect, useState } from "react";
import { useOutlet } from "react-router-dom";
import { useModal } from "../../store/useModal";

export const CurrentPage = () => {
  const o = useOutlet();
  const [outlet] = useState(o);
  const { setModalId } = useModal();

  useEffect(() => {
    setModalId("");
  }, []);

  return <>{outlet}</>;
};

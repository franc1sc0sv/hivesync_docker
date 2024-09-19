import { useContext } from "react";
import { SelectContext } from "./SelectContext";

export const useSelect = () => {
  return useContext(SelectContext);
};

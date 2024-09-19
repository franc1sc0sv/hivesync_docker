import { useContext } from "react";
import { CallContext } from "./CallContext";

export const useCall = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error("useCallContext must be used within a CallProvider");
  }
  return context;
};

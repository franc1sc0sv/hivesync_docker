import { createContext, ReactNode, useState } from "react";

interface Props {
  showOptions: boolean;
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
  value: Option;
  setValue: React.Dispatch<React.SetStateAction<Option>>;
}
export const SelectContext = createContext<Props>({
  showOptions: false,
  setShowOptions: () => {},
  value: { name: "", id: "" },
  setValue: () => {},
});

export const SelectProvider = ({ children }: { children: ReactNode }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [value, setValue] = useState<Option>({ name: "", id: "" });

  return (
    <SelectContext.Provider
      value={{ value, setValue, setShowOptions, showOptions }}
    >
      {children}
    </SelectContext.Provider>
  );
};

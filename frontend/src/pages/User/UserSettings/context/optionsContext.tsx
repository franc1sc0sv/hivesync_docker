import { createContext, useState } from "react";
import { NoOptionSelected } from "../Components/noOptionSelected";

interface Option {
  option: React.ReactNode;
}

interface ContextProps {
  component: React.ReactNode;
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  renderOption: (option: Option) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const OptionsContext = createContext<ContextProps>({
  component: <></>,
  setComponent: () => {}, 
  renderOption: () => {}, 
});

export const OptionsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [component, setComponent] = useState<React.ReactNode>(<NoOptionSelected />);

  const renderOption = ({ option }: Option) => setComponent(option);

  return (
    <OptionsContext.Provider value={{ component, setComponent, renderOption }}>
      {children}
    </OptionsContext.Provider>
  );
};

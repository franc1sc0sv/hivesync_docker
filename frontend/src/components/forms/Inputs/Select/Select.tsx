import { SelectProvider } from "./SelectContext";
import { SelectionInput } from "./SelectionUI";

export const SelectInput = (props: PropsSelect) => {
  return (
    <SelectProvider>
      <SelectionInput {...props} />
    </SelectProvider>
  );
};

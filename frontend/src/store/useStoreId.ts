import { create } from "zustand";

interface ModalState {
  id: string;
  setID: (value: string) => void;
}

export const useStoreId = create<ModalState>((set) => ({
  id: "",
  setID: (value) => set({ id: value }),
}));

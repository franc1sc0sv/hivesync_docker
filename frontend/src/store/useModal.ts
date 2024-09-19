import { create } from 'zustand';

interface ModalState {
  modalId: string,
  setModalId: (value: string) => void
}

export const useModal = create<ModalState>((set) => ({
  modalId: "",
  setModalId: (value) => set({ modalId: value }),
}));
import { create } from "zustand";

interface ModalState {
  channelData: { id: string; name: string } | null;
  setChannelID: ({ id, name }: { id: string; name: string }) => void;
}

export const useChannelID = create<ModalState>((set) => ({
  channelData: null,
  setChannelID: (value) => set({ channelData: value }),
}));

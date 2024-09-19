import { create } from "zustand";

interface SingleImageState {
  imagen: File[]; 
  data: File[]; 
  setImagen: (value: File[]) => void; 
  setData: (value: File[]) => void; 
}

const useSingleImage = create<SingleImageState>((set) => ({
  imagen: [], 
  data: [], 
  setImagen: (value: File[]) => set({ imagen: value }), 
  setData: (value: File[]) => set({ data: value }), 
}));

export { useSingleImage };

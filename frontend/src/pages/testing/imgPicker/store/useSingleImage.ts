import { create } from "zustand";

// Define el tipo del estado de la tienda (store)
interface SingleImageState {
  imagen: File[]; 
  data: File[]; 
  setImagen: (value: File[]) => void; 
  setData: (value: File[]) => void; 
}

// Crear la tienda con Zustand
const useSingleImage = create<SingleImageState>((set) => ({
  imagen: [], // Estado inicial de `imagen`
  data: [], // Estado inicial de `data`
  setImagen: (value: File[]) => set({ imagen: value }), 
  setData: (value: File[]) => set({ data: value }), 
}));

export { useSingleImage };

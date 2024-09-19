import { create } from "zustand";

type User = {
  user: Usuario | null;
  setUser: (value: Usuario) => void;
  login: (value: Usuario) => void;
  logout: () => void;
};

const useSession = create<User>((set) => ({
  user: null,
  setUser: (value) => set({ user: value }),
  login: (value) => {
    set({ user: value });
    localStorage.setItem("token", value.token);
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("token");
    window.location.href = "/";
  },
}));

export { useSession };

import { create } from "zustand";

interface FakePagesArrayProps {
  id: number;
  title: string | React.ReactNode ;
  children: React.ReactNode;
}

interface FakePagesState {
  fakePages: FakePagesArrayProps[];
  addFakePage: ({ title, children }: Omit<FakePagesArrayProps, "id">) => void;
  removeFakePage: (id: number) => void;
}

 let nextId = 0;

const useFakePages = create<FakePagesState>((set) => ({
  fakePages: [],

  addFakePage: ({ title, children }) =>
    set((state) => ({
      fakePages: [...state.fakePages, { id: nextId++, title, children }],
    })),

  removeFakePage: (id: number) =>
    set((state) => ({
      fakePages: state.fakePages.filter((page) => page.id !== id),
    })),
}));

export default useFakePages;

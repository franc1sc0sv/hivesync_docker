import { create } from "zustand";

type User = {
  id: string;
  email: string;
  username: string;
  password: string;
  token: string;
  profileUrl: string;
  backgroundUrl: string;
  name: string;
  createdAt: string; // ISO 8601 date string
  about: string;
};

type Server = {
  id: string;
  name: string;
  avatarURL: string;
  privacity: "PUBLIC" | "PRIVATE"; // Ajusta según el enum PrivacityServer
  id_user: string;
  createdAt: string; // ISO 8601 date string
  url: string;
};

type RequestWithUserAndServer = {
  id_notification: string;
  id_request: string;
  user: User;
  server: Server;
} | null;

type Props = {
  MemberData: RequestWithUserAndServer;
  setMemberData: (value: RequestWithUserAndServer) => void;
};

const useAddMembers = create<Props>((set) => ({
  MemberData: null,
  setMemberData: (value) => set({ MemberData: value }),
}));

export { useAddMembers };

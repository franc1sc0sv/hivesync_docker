import { create } from 'zustand';

interface VideoStreamState {
  stream: MediaStream | null;
  setStream: (stream: MediaStream) => void;
  clearStream: () => void;
}

const useVideoStream = create<VideoStreamState>((set) => ({
  stream: null,
  setStream: (stream) => set({ stream }),
  clearStream: () => set({ stream: null }),
}));

export default useVideoStream;
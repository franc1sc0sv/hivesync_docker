import create from "zustand";

interface ScreenShareState {
  screenStream: MediaStream | null;
  error: string | null;
  startScreenShare: () => Promise<void>;
  stopScreenShare: () => void;
}

export const useScreenShare = create<ScreenShareState>((set) => ({
  screenStream: null,
  error: null,

  startScreenShare: async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      set({
        screenStream: displayStream,
        error: null,
      });

      // Handle screen sharing end
      displayStream.getTracks().forEach((track) => {
        track.onended = () => {
          set({ screenStream: null });
        };
      });
    } catch (err) {
      console.error("Error al intentar compartir la pantalla:", err);
      set({
        screenStream: null,
        error:
          "No se pudo compartir la pantalla. Asegúrate de que has concedido los permisos necesarios.",
      });
    }
  },

  stopScreenShare: () => {
    set((state) => {
      state.screenStream?.getTracks().forEach((track) => track.stop());
      return { screenStream: null };
    });
  },
}));

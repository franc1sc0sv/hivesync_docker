// useMicrophoneStore.ts
import { create } from 'zustand';
import { INITIAL_MICROPHONE_STATE, LOCAL_STORAGE_KEY } from '../../components/layouts/VideocallLayout/config';



interface MicrophoneState {
  isMicrophoneActive: boolean;
  toggleMicrophone: () => Promise<void>;
}

const useMicrophoneStore = create<MicrophoneState>((set) => ({
  isMicrophoneActive: INITIAL_MICROPHONE_STATE,
  toggleMicrophone: async () => {
    set((state) => {
      const newState = !state.isMicrophoneActive;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return { isMicrophoneActive: newState };
    });
  },
}));

export default useMicrophoneStore;

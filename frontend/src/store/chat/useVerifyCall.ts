import { create } from 'zustand';

interface VerifyCallProps {
  isVoiceCall: boolean | null;
  setIsVoiceCall: (value: boolean) => void;
}

const useVerifyCallType = create<VerifyCallProps>((set) => ({
  isVoiceCall: null,
  setIsVoiceCall: (isVoiceCall) => set({ isVoiceCall }),
}));

export default useVerifyCallType;
import { create } from 'zustand';

interface DialogueState {
  dialogueState: boolean
  setDialogueState: (value: boolean) => void
}

export const useDialogue = create<DialogueState>((set) => ({
  dialogueState: false,
  setDialogueState: (value) => set({ dialogueState: value }),
}));
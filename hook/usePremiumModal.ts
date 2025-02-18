import { create } from "zustand";
export type PremiumModalStore = {
  isOpen: boolean;
  workspaceId: string | null;
  onOpen: (workspaceId: string) => void;
  onClose: () => void;
};

export const usePremiumModal = create<PremiumModalStore>((set) => ({
  isOpen: false,
  workspaceId: null,
  onOpen: (workspaceId) => set({ isOpen: true, workspaceId }),
  onClose: () => set({ isOpen: false, workspaceId: null }),
}));

import { create } from "zustand";
export type CreateWorkspaceModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateWorkspaceFormModal = create<CreateWorkspaceModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

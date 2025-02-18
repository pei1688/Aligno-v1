import { create } from "zustand";
export type DeleteWorkspaceStore = {
  isOpen: boolean;
  workspace: { id: string; title: string } | null;
  onOpen: (workspace: { id: string; title: string }) => void;
  onClose: () => void;
};

export const useDeleteWorkspaceModal = create<DeleteWorkspaceStore>((set) => ({
  isOpen: false,
  workspace: null,
  onOpen: (workspace) => set({ isOpen: true, workspace }),
  onClose: () => set({ isOpen: false, workspace: null }),
}));

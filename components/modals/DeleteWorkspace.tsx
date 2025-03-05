"use client";

import { deleteWorkspace } from "@/aciotns/workspace/deleteWorkspace";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDeleteWorkspaceModal } from "@/hook/useDeleteWorkspace";

const DeleteWorkspaceModal = () => {
  const { isOpen, onClose, workspace } = useDeleteWorkspaceModal();
  const [confirmTitle, setConfirmTitle] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!workspace) return null;
  const handleDelete = async () => {
    if (confirmTitle !== workspace.title) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("workspaceId", workspace.id);
        const res = await deleteWorkspace(formData);

        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("刪除工作區成功");
          onClose();
          router.push("/");
        }
      } catch (error) {
        console.error("刪除工作區失敗:", error);
        toast.error("刪除工作區失敗");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>要刪除此工作區嗎？</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <p className="text-mb font-semibold">
          🔸輸入要刪除的工作區名稱
          <span className="text-red-500">「{workspace.title}」</span> 須知事項：
        </p>
        <p className="text-sm">
          ▫️此為永久性動作，將無法復原。此工作區所有的看板都將被關閉。
          <br />
          ▫️輸入工作區名稱以刪除。
        </p>
        <Input
          type="text"
          id="confirmTitle"
          placeholder="輸入工作區名稱..."
          value={confirmTitle}
          onChange={(e) => setConfirmTitle(e.target.value)}
          className="w-full border border-rose-500 px-4 py-2"
        />
        <Button
          onClick={handleDelete}
          disabled={isPending || confirmTitle !== workspace.title}
          className="mt-2 w-full justify-center bg-rose-500 text-white hover:bg-rose-400 disabled:cursor-not-allowed"
        >
          確認刪除
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWorkspaceModal;

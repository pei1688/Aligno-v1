"use client";

import { copyCard } from "@/aciotns/card/copyCard";
import { deleteCard } from "@/aciotns/card/deleteCard";
import { DeleteOrCopyCardSchema } from "@/aciotns/card/GeneralSchema/DeleteOrCopy-CardSchema";
import { Button } from "@/components/ui/button";
import { useCardModal } from "@/hook/useCardModal";
import { CardWithList } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Files, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ActionProps {
  card: CardWithList;
}

export const Action = ({ card }: ActionProps) => {
  const [isPending, startTransition] = useTransition();
  const cardModal = useCardModal();
  const params = useParams();
  const {
    handleSubmit,
  } = useForm<{ title: string; id: string; boardId: string }>({
    resolver: zodResolver(DeleteOrCopyCardSchema),
    defaultValues: { id: card.id, boardId: params.boardId as string },
  });
  const onDelete = async (data: { id: string; boardId: string }) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("boardId", data.boardId);
    startTransition(async () => {
      try {
        const res = await deleteCard(formData);
        if (res?.error) {
          toast.error(res.error);
          return;
        } else {
          cardModal.onClose();
          toast.success("刪除列表成功");
        }
      } catch (error) {
        console.error("刪除列表失敗:", error);
      }
    });
  };

  const onCopy = async (data: { id: string; boardId: string }) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("boardId", data.boardId);
    startTransition(async () => {
      try {
        const res = await copyCard(formData);
        if (res?.error) {
          toast.error(res.error);
          return;
        } else {
          cardModal.onClose();
          toast.success("複製列表成功");
        }
      } catch (error) {
        console.error("複製列表失敗:", error);
      }
    });
  };
  return (
    <div className="text-aligno-300 space-y-2">
      <p className="text-xs font-semibold ">動作</p>
      <Button
        className="flex items-center gap-x-2 "
        size="action"
        variant="gray"
        onClick={handleSubmit(onCopy)}
        disabled={isPending}
      >
        <Files className="w-4 h-4" />
        複製
      </Button>
      <Button
        className="flex items-center gap-x-2 "
        size="action"
        variant="gray"
        onClick={handleSubmit(onDelete)}
        disabled={isPending}
      >
        <Trash className="w-4 h-4" />
        刪除
      </Button>
    </div>
  );
};


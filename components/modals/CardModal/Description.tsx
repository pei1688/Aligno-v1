"use client";

import { updateCard } from "@/aciotns/card/updateCard";
import { UpdateCardSchema } from "@/aciotns/card/updateCard/schema";
import { FormTextarea } from "@/components/form/FormTextarea";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { CardWithList } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Text } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
  card: CardWithList;
}

const Description = ({ card }: DescriptionProps) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };
  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ description: string; id: string; boardId: string }>({
    resolver: zodResolver(UpdateCardSchema),
    defaultValues: {
      description: card.description || "", // 初始值設為卡片描述
      id: card.id,
      boardId: params.boardId as string,
    },
  });

  const onSubmit = async (data: {
    description: string;
    id: string;
    boardId: string;
  }) => {
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("id", data.id);
    formData.append("boardId", data.boardId);
    startTransition(async () => {
      try {
        const res = await updateCard(formData);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("更新成功");
          disableEditing();
          //讓 React Query 重新獲取與這些 query 相關的數據，確保在更新卡片描述後，相關的數據會被同步更新。
          queryClient.invalidateQueries({ queryKey: ["card", card.id] });
          queryClient.invalidateQueries({ queryKey: ["card-logs", card.id] });
        }
      } catch (error) {
        console.error("更新描述失敗:", error);
      }
    });
  };

  return (
    <div className="flex items-start gap-x-3 w-full text-neutral-100/70">
      <Text className="h-5 w-5 mt-0.5 " />
      <div className="w-full">
        <p className="font-semibold mb-4">描述</p>
        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
            className="space-y-4"
          >
            <FormTextarea
              id="description"
              placeholder="請輸入描述..."
              register={register}
              textareaRef={textareaRef} // 讓外部控制 focus
              className="bg-aligno-600 border-aligno-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
            <div className="flex items-center gap-x-4">
              <SubmitButton
                disabled={isPending}
                variant="transparent"
                className="bg-neutral-700"
              >
                儲存
              </SubmitButton>
              <Button
                type="button"
                variant="transparent"
                onClick={disableEditing}
              >
                取消
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            onClick={enableEditing}
            className="text-sm font-medium py-3"
          >
            {card.description || "新增更詳細的描述..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;


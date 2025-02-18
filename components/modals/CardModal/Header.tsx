"use client";
import { updateCard } from "@/aciotns/card/updateCard";
import { UpdateCardSchema } from "@/aciotns/card/updateCard/schema";
import { Input } from "@/components/ui/input";
import { useUpdateCardStatus } from "@/hook/useUpdateCardStatus";
import { CardWithList } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Circle, CircleCheck } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface HeaderProps {
  card: CardWithList;
}
const Header = ({ card }: HeaderProps) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const { updateStatus, isPending: isTransitionPending } =
    useUpdateCardStatus();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<{ title: string; id: string; boardId: string }>({
    resolver: zodResolver(UpdateCardSchema),
    defaultValues: {
      title: card.title,
      id: card.id,
      boardId: params.boardId as string,
    },
  });
  const onSubmit = async (data: {
    title: string;
    id: string;
    boardId: string;
  }) => {
    if (data.title === card.title) {
      return;
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("id", data.id);
    formData.append("boardId", data.boardId);
    startTransition(async () => {
      try {
        const res = await updateCard(formData);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("更新成功");
          //讓 React Query 重新獲取與這些 query 相關的數據，確保在更新卡片標題後，相關的數據會被同步更新。
          queryClient.invalidateQueries({ queryKey: ["card", card.id] }); //
          queryClient.invalidateQueries({ queryKey: ["card-logs", card.id] });
        }
      } catch (error) {
        console.error("更新標題失敗:", error);
      }
    });
  };
  const handleToggleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newStatus = !card.completed;
    updateStatus(card.id, card, newStatus);
  };
  return (
    <div className="flex items-center gap-x-3 mb-6 w-full text-aligno-300">
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 mb-2 relative"
        >
          <button
            onClick={handleToggleComplete}
            disabled={isTransitionPending}
            className="absolute left-0 top-1/2 transform -translate-y-1/2  transition-opacity duration-200"
          >
            {card.completed ? (
              <CircleCheck className="w-4 h-4 fill-green-500 text-aligno-400 " />
            ) : (
              <Circle className="w-5 h-5 text-aligno-300" />
            )}
          </button>
          <Input type="hidden" defaultValue={card.id} {...register("id")} />
          <Input
            type="hidden"
            defaultValue={params.boardId}
            {...register("boardId")}
          />

          <Input
            type="text"
            id="title"
            disabled={isPending}
            defaultValue={card.title}
            {...register("title")}
            ref={(e) => {
              inputRef.current = e;
              register("title").ref(e);
            }}
            onBlur={async () => {
              const isValid = await trigger("title");
              if (isValid) {
                await handleSubmit(onSubmit)();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (inputRef.current) {
                  inputRef.current.blur();
                }
              }
            }}
            className="font-semibold text-xl px-1 h-auto bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-neutral-800 focus-visible:border-input truncate translate-x-6"
          />
          {errors.title && (
            <p className="text-red-500 text-sm w-[100px]">
              {errors.title.message}
            </p>
          )}
        </form>
        <p className="text-sm text-aligno-300 ml-6">
          位於{" "}
          <span className=" bg-orange-300 text-orange-900 px-2 rounded-sm">
            {card.list.title}
          </span>{" "}
          列表
        </p>
      </div>
    </div>
  );
};

export default Header;

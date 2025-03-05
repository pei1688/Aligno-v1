"use client";
import { updateCard } from "@/aciotns/card/updateCard";
import { UpdateCardSchema } from "@/aciotns/card/updateCard/schema";
import ErrorMessage from "@/components/form/Form-Error";
import { FormInput } from "@/components/form/Form-Input";
import { Input } from "@/components/ui/input";
import { CardWithList } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface HeaderProps {
  card: CardWithList;
}
const Header = ({ card }: HeaderProps) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    control,
    formState: { errors },
  } = useForm<{ title: string; id: string; boardId: string }>({
    resolver: zodResolver(UpdateCardSchema),
    defaultValues: {
      title: card.title,
      id: card.id,
      boardId: params.boardId as string,
    },
  });
  const onSubmit = (data: { title: string; id: string; boardId: string }) => {
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
  return (
    <div className="mb-6 flex w-full items-center gap-x-3 text-aligno-300">
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative mb-2 flex items-center gap-2"
        >
          <Input type="hidden" defaultValue={card.id} {...register("id")} />
          <Input
            type="hidden"
            defaultValue={params.boardId}
            {...register("boardId")}
          />
          <div className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="title"
                  defaultValue={card.title}
                  disabled={isPending}
                  className="relative -left-1.5 h-auto w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold focus-visible:border-input focus-visible:bg-neutral-800"
                  onCustomBlur={async () => {
                    const isValid = await trigger("title");
                    if (isValid) {
                      await handleSubmit(onSubmit)();
                    } else {
                      setFocus("title");
                    }
                  }}
                  {...field}
                />
              )}
            />
          </div>
          <ErrorMessage errormessage={errors.title?.message} />
        </form>
        <p className="ml-6 text-sm text-aligno-300">
          位於{" "}
          <span className="rounded-sm bg-orange-300 px-2 text-orange-900">
            {card.list.title}
          </span>{" "}
          列表
        </p>
      </div>
    </div>
  );
};

export default Header;

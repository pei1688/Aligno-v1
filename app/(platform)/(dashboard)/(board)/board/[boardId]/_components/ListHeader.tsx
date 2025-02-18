"use client";

import { update } from "@/aciotns/list/updateList";
import { UpdateListSchema } from "@/aciotns/list/updateList/schema";
import { Input } from "@/components/ui/input";
import { ListWithCards } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import ListOption from "./ListOption";
import ErrorMessage from "@/components/form/ErrorMessage";

interface ListHeaderProps {
  list: ListWithCards;
  onAddCard: () => void;
}

const ListHeader = ({ list, onAddCard }: ListHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<{ title: string; id: string; boardId: string }>({
    resolver: zodResolver(UpdateListSchema),
    defaultValues: { title: list.title, id: list.id, boardId: list.boardId },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  // 提交表單
  const onSubmit = async (data: {
    title: string;
    id: string;
    boardId: string;
  }) => {
    if (data.title.trim() === list.title) {
      disableEditing();
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("id", data.id);
    formData.append("boardId", data.boardId);
    startTransition(async () => {
      try {
        const res = await update(formData);
        if (res?.error) {
          toast.error(res.error);
          return;
        } else {
          toast.success("更新成功");
        }
        disableEditing();
      } catch (error) {
        console.error("更新標題失敗:", error);
      }
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col "
        >
          <Input
            {...register("title")}
            ref={(e) => {
              inputRef.current = e;
              register("title").ref(e);
            }}
            onBlur={async () => {
              const isValid = await trigger("title");
              if (isValid) {
                handleSubmit(onSubmit)();
              }
            }}
            type="text"
            id="title"
            defaultValue={list.title}
            disabled={isPending}
            className="  px-[7px] p-2 h-9 bg-transparent "
          />
          <Input type="hidden" value={list.id} name="id" id="id" />
          <Input
            type="hidden"
            value={list.boardId}
            name="boardId"
            id="boardId"
            className="focus:border-none"
          />
          <ErrorMessage errormessage={errors.title?.message} />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full h-9 px-2 font-semibold border-transparent cursor-pointer flex items-center"
        >
          <span className="px-3">{list.title}</span>
        </div>
      )}
      <ListOption list={list} onAddCard={onAddCard} />
    </div>
  );
};

export default ListHeader;

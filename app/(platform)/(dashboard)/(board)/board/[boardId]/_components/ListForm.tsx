"use client";

import { Plus, X } from "lucide-react";
import ListWrapper from "./ListWrapper";
import SubmitButton from "@/components/SubmitButton";
import { useState, useRef, useTransition } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateListSchema } from "@/aciotns/list/createList/schema";
import { toast } from "sonner";
import { createList } from "@/aciotns/list/createList";
import ErrorMessage from "@/components/form/ErrorMessage";

const ListForm = () => {
  const params = useParams<{ boardId: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string; boardId: string }>({
    resolver: zodResolver(CreateListSchema),
    defaultValues: { title: "", boardId: params.boardId },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
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

  // 監聽 Escape 鍵
  useEventListener("keydown", onKeyDown);
  // 點擊表單外部時關閉輸入框
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = async (data: { title: string; boardId: string }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("boardId", data.boardId);
    startTransition(async () => {
      try {
        const res = await createList(formData);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("建立成功");
          reset();
        }
        disableEditing();
      } catch (error) {
        console.error("建立失敗:", error);
        reset();
      }
    });
  };

  return (
    <>
      {isEditing ? (
        <ListWrapper>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full p-3 rounded-md bg-aligno-800/80 space-y-4 shadow-md"
          >
            <Input
              type="text"
              id="title"
              placeholder="輸入列表名稱"
              className="text-sm px-2 py-1 font-medium border-transparent hover:border-input focus:border-input transition"
              {...register("title")}
              ref={(e) => {
                inputRef.current = e;
                register("title").ref(e);
              }}
            />
            <ErrorMessage errormessage={errors.title?.message} />
            <Input type="hidden" value={params.boardId} name="boardId" />
            <div className="flex items-center gap-x-2">
              <SubmitButton variant="transparent" className="w-[100px]" disabled={isPending}>
                新增列表
              </SubmitButton>
              <Button onClick={disableEditing} variant="transparent" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </ListWrapper>
      ) : (
        <ListWrapper>
          <button
            onClick={enableEditing}
            className="w-full rounded-md bg-aligno-700/90 hover:bg-aligno-800/80 transition flex p-3 items-center font-medium text-sm h-12"
          >
            <Plus className="w-4 h-4" />
            新增列表
          </button>
        </ListWrapper>
      )}
    </>
  );
};

export default ListForm;

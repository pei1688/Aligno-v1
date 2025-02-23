"use client";
import { updateBoard } from "@/aciotns/board/updateBoard";
import { UpdateBoardSchema } from "@/aciotns/board/updateBoard/schema";
import ErrorMessage from "@/components/form/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface BoardTitleProps {
  title: string;
  id: string;
}

const BoardTitleForm = ({ title, id }: BoardTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<{ title: string; id: string }>({
    resolver: zodResolver(UpdateBoardSchema),
    defaultValues: { title: title, id },
  });

  // 啟用編輯
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  // 關閉編輯
  const disableEditing = () => {
    setIsEditing(false);
  };

  // 提交表單
  const onSubmit = async (data: { title: string }) => {
    if (data.title.trim() === title) {
      disableEditing();
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("id", id);

    startTransition(async () => {
      try {
        const res = await updateBoard(formData);
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

  return isEditing ? (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center px-2 ">
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
        defaultValue={title}
        className="text-lg font-bold px-[7px] p-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
      />
      <ErrorMessage errormessage={errors.title?.message} />
    </form>
  ) : (
    <div
      role="button"
      onClick={enableEditing}
      className="font-bold text-lg size-auto p-1 px-3 truncate max-w-[300px] w-full"
    >
      {title}
    </div>
  );
};

export default BoardTitleForm;

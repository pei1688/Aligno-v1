"use client";
import { updateBoard } from "@/aciotns/board/updateBoard";
import { UpdateBoardSchema } from "@/aciotns/board/updateBoard/schema";
import ErrorMessage from "@/components/form/Form-Error";
import { FormInput } from "@/components/form/Form-Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
interface BoardTitleProps {
  title: string;
  id: string;
}

const BoardTitleForm = ({ title, id }: BoardTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    trigger,
    setFocus,
    control,
    formState: { errors },
  } = useForm<{ title: string; id: string }>({
    resolver: zodResolver(UpdateBoardSchema),
    defaultValues: { title: title, id },
  });

  // 啟用編輯
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      setFocus("title");
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
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <FormInput
            id="title"
            disabled={isPending}
            className="px-[7px] p-1 h-7 bg-transparent border-2 border-transparent focus:border-focusInput text-base font-semibold transition-all"
            onCustomBlur={async () => {
              const isValid = await trigger("title");
              if (isValid) {
                handleSubmit(onSubmit)();
              }
            }}
            {...field}
          />
        )}
      />
      <ErrorMessage errormessage={errors.title?.message} />
    </form>
  ) : (
    <div
      role="button"
      onClick={enableEditing}
      className="font-bold text-lg size-auto p-1 px-3 truncate max-w-[300px] w-full border-2 border-transparent cursor-pointer flex items-center "
    >
      <span className="block w-full text-base font-semibold">{title}</span>
    </div>
  );
};

export default BoardTitleForm;

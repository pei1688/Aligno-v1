"use client";
import { createCard } from "@/aciotns/card/createCard";
import { CreateCardSchema } from "@/aciotns/card/createCard/schema";
import { FormTextarea } from "@/components/form/FormTextarea";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { forwardRef, KeyboardEventHandler, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}
//forwardRef 讓父元件可以直接操控子元件的 DOM
export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<HTMLFormElement | null>(null);
    const [isPending, startTransition] = useTransition();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<{ title: string; listId: string; boardId: string }>({
      resolver: zodResolver(CreateCardSchema),
      defaultValues: {
        title: "",
        listId,
        boardId: params.boardId as string,
      },
    });

    const onSubmit = async (data: {
      title: string;
      listId: string;
      boardId: string;
    }) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("listId", data.listId);
      formData.append("boardId", data.boardId);
      startTransition(async () => {
        try {
          const res = await createCard(formData);
          if (res?.error) {
            toast.error(res.error);
          } else {
            reset();
            toast.success("建立成功");
          }
          disableEditing();
        } catch (error) {
          console.error("建立失敗:", error);
        }
      });
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const textKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
        reset();
      }
    };

    return isEditing ? (
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="m-1 py-0.5 px-1 space-y-4 "
      >
        <FormTextarea
          id="title"
          ref={ref}
          placeholder="輸入標題"
          register={register}
          onKeyDown={textKeyDown}
          errormessage={errors.title?.message}
          className="bg-aligno-600 border-aligno-500"
        />
        <Input type="hidden" value={listId} name="listId" />
        <Input type="hidden" value={params.boardId} name="boardId" />
        <div className="flex items-center gap-x-1">
          <SubmitButton variant="transparent" disabled={isPending}>
            建立卡片
          </SubmitButton>
          <Button variant="transparent" onClick={disableEditing} size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </form>
    ) : (
      <div className="pt-2">
        <Button
          className=" flex items-start px-2 mx-2 mb-2 w-[240px]"
          variant="transparent"
          onClick={enableEditing}
        >
          <Plus /> 新增卡片
        </Button>
      </div>
    );
  }
);

//forwardRef 會讓 React 無法正確推測元件名稱
//displayName 可以讓 DevTools 和錯誤訊息顯示正確的元件名稱
CardForm.displayName = "CardForm";

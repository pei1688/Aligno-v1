"use client";

import { createWorkspace } from "@/aciotns/workspace/createWorkspace";
import { CreateWorkspaceSchema } from "@/aciotns/workspace/createWorkspace/schema";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormTextarea } from "@/components/form/FormTextarea";
import { useCreateWorkspaceFormModal } from "@/hook/useCreateWorkspaceFormModal";

type WorkspaceFormProps = {
  title: string;
  description?: string;
};

const CreateWorkspaceModal = () => {
  const wsModal = useCreateWorkspaceFormModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkspaceFormProps>({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: { title: "", description: "" },
  });
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (data: WorkspaceFormProps) => {
    startTransition(async () => {
      try {
        await createWorkspace({ ...data });
        toast.success("看板建立成功");
        reset();
        closeRef.current?.click();
      } catch (error) {
        toast.error("建立看板失敗");
      }
    });
  };
  return (
    <Dialog open={wsModal.isOpen} onOpenChange={wsModal.onClose}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-aligno-200">立即打造工作區</DialogTitle>
          <DialogDescription className="mt-4 text-aligno-200/70">
            讓大家更容易在同一位置存取看板，以提高你的工作效率。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className=" mt-4 ">
          <Label className="text-aligno-200">工作區名稱</Label>
          <Input
            type="text"
            id="title"
            className="my-4"
            required
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
          <FormTextarea
            label="工作區說明(選填)"
            labelClassName="text-aligno-200"
            id="description"
            placeholder="輸入工作區說明&描述..."
            errormessage={errors.description?.message}
            register={register}
            className="px-4 my-4 bg-aligno-500 border-aligno-400 "
          />
          <DialogClose ref={closeRef} className="hidden" />
          <SubmitButton
            className="w-full justify-center bg-aligno-600 mt-4 text-aligno-200"
            disabled={isPending}
            variant="work"
          >
            {isPending ? "建立中..." : "建立"}
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;

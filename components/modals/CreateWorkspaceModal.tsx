"use client";

import { createWorkspace } from "@/aciotns/workspace/createWorkspace";
import { CreateWorkspaceSchema } from "@/aciotns/workspace/createWorkspace/schema";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormTextarea } from "@/components/form/Form-Textarea";
import { useCreateWorkspaceFormModal } from "@/hook/useCreateWorkspaceFormModal";
import { FormInput } from "../form/Form-Input";
import ErrorMessage from "../form/Form-Error";

type WorkspaceFormProps = {
  title: string;
  description?: string;
};

const CreateWorkspaceModal = () => {
  const wsModal = useCreateWorkspaceFormModal();
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    control,
    formState: { errors },
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
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <FormInput
                id="title"
                label="工作區名稱"
                placeholder="輸入工作區名稱"
                className="my-4"
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
          <FormTextarea
            label="工作區說明(選填)"
            labelClassName="text-aligno-200"
            id="description"
            placeholder="輸入工作區說明&描述..."
            errormessage={errors.description?.message}
            register={register}
            className="my-4 border-aligno-400 bg-aligno-500 px-4"
          />
          <DialogClose ref={closeRef} className="hidden" />
          <SubmitButton
            className="mt-4 w-full justify-center bg-aligno-600 text-aligno-200"
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

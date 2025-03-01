"use client";

import { updateWorkspace } from "@/aciotns/workspace/updateWorkspace";
import { UpdateWorkspaceSchema } from "@/aciotns/workspace/updateWorkspace/schema";
import ErrorMessage from "@/components/form/Form-Error";
import { FormInput } from "@/components/form/Form-Input";
import { FormTextarea } from "@/components/form/Form-Textarea";
import DeleteWorkspaceModal from "@/components/modals/DeleteWorkspace";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDeleteWorkspaceModal } from "@/hook/useDeleteWorkspace";
import { zodResolver } from "@hookform/resolvers/zod";
import { Workspace } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface SettingFormProps {
  workspace: Workspace;
}

const SettingForm = ({ workspace }: SettingFormProps) => {
  const deleteModal = useDeleteWorkspaceModal();
  const router = useRouter();
  const params = useParams<{ workspaceId: string }>();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateWorkspaceSchema),
    defaultValues: {
      description: workspace.description || "",
      title: workspace.title,
      workspaceId: params.workspaceId,
    },
  });
  const onSubmit = async (data: {
    title: string;
    description: string;
    workspaceId: string;
  }) => {
    if (
      data.title === workspace.title &&
      data.description === workspace.description
    ) {
      return;
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("workspaceId", data.workspaceId);
    formData.append("description", data.description);

    startTransition(async () => {
      try {
        const res = await updateWorkspace(formData);
        if (res?.error) {
          toast.error(res.error);
          return;
        }
        reset();
        toast.success("更新工作區成功");
        router.push(`/workspace/${workspace.id}`);
      } catch (error) {
        reset();
        console.error("更新工作區失敗:", error);
        toast.error("更新工作區失敗");
      }
    });
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="mb-4 space-y-2">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <FormInput
                id="title"
                label="工作區名稱"
                disabled={isPending}
                className="px-4 py-2 w-full"
                placeholder="工作區名稱..."
                {...field}
              />
            )}
          />
        </div>
        <ErrorMessage errormessage={errors.title?.message} />

        <FormTextarea
          label="工作區說明"
          id="description"
          defaultValue={workspace.description || ""}
          placeholder="輸入工作區說明&描述..."
          errormessage={errors.description?.message}
          register={register}
          className="px-4 py-2 w-full bg-aligno-500 border-aligno-400"
        />

        <Input type="hidden" value={params.workspaceId} name="workspaceId" />
        <SubmitButton className="mt-4" disabled={isPending}>
          更新
        </SubmitButton>
      </form>

      {/* 刪除對話框 */}
      <div
        onClick={() =>
          deleteModal.onOpen({ id: workspace.id, title: workspace.title })
        }
        className="text-sm text-rose-500 hover:text-rose-600 hover:underline cursor-pointer"
      >
        要刪除此工作區嗎？
      </div>

      {/* 刪除工作區的 Modal */}
      <DeleteWorkspaceModal />
    </div>
  );
};

export default SettingForm;

"use client";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SubmitButton from "../SubmitButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { createBoard } from "@/aciotns/board/createBoard";
import FormPicker from "./FormPicker";
import { CreateBoardSchema } from "@/aciotns/board/createBoard/schema";
import ErrorMessage from "./ErrorMessage";
import Link from "next/link";
import { createWorkspace } from "@/aciotns/workspace/createWorkspace";
import { useRouter } from "next/navigation";
import { usePremiumModal } from "@/hook/usePremiumModal";
interface WorkspaceProps {
  id: string;
  title: string;
}
interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  workspaces: WorkspaceProps[];
  userName?: string | null;
}
const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset,
  workspaces,
  userName,
}: FormPopoverProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: { title: "", image: "", workspaceId: "" },
  });
  const premiumModal = usePremiumModal();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const onSubmit = async (data: {
    title: string;
    image: string;
    workspaceId: string;
  }) => {
    startTransition(async () => {
      try {
        let targetWorkspaceId = data.workspaceId;

        // 如果沒有選擇工作區且沒有現有工作區
        if (!targetWorkspaceId && (!workspaces || workspaces.length === 0)) {
          // 自動建立工作區
          const workspaceResponse = await createWorkspace({
            title: `${userName}的工作區`, // 使用用戶名作為預設名稱
          });

          if (workspaceResponse?.error) {
            toast.error(workspaceResponse.error);
            return;
          }

          if (workspaceResponse?.data?.id) {
            targetWorkspaceId = workspaceResponse.data.id;
          }
        }

        // 準備表單數據
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("image", data.image);
        formData.append("workspaceId", targetWorkspaceId);

        // 建立看板
        const boardResponse = await createBoard(formData);

        if (boardResponse?.error) {
          toast.error(boardResponse.error);
          reset();
          premiumModal.onOpen(targetWorkspaceId);
          return;
        }
        // 成功處理
        reset();
        toast.success("看板建立成功");
        closeRef.current?.click();
        if (boardResponse.data?.workspaceId) {
          router.push(`/workspace/${boardResponse.data.workspaceId}`);
        }
      } catch (error) {
        console.error("完整錯誤訊息:", error);
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3 text-aligno-200"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center ">建立看板</div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2"
            variant="popover"
          >
            <X className="h-4 w-4 " />
          </Button>
        </PopoverClose>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
          <div className="space-y-4">
            <FormPicker
              id="image"
              isPending={isPending}
              images={images}
              setImages={setImages}
              register={register}
              setValue={setValue}
            />
            <ErrorMessage errormessage={errors.image?.message} />
            <Label className="">看板名稱</Label>
            <Input
              type="text"
              id="title"
              required
              {...register("title")}
              className="px-4"
            />
            <ErrorMessage errormessage={errors.title?.message} />

            {/* 選擇工作區 */}
            {workspaces?.length > 0 && (
              <div className="space-y-4">
                <Label className="">工作區</Label>
                <select
                  id="workspaceId"
                  name="workspaceId"
                  value={watch("workspaceId")}
                  onChange={(e) => setValue("workspaceId", e.target.value)}
                  className="w-full p-2 text-sm font-medium border rounded-md bg-aligno-500 focus:outline-none border-aligno-400"
                >
                  <option value="">選擇工作區</option>
                  {workspaces?.map((workspace) => (
                    <option
                      value={workspace.id}
                      key={workspace.id}
                      className=""
                    >
                      {workspace.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <SubmitButton className="w-full justify-center" disabled={isPending}>
            {isPending ? "建立中..." : "建立"}
          </SubmitButton>
        </form>
        <p className="text-xs mt-2 text-aligno-300">
          使用 Unsplash 的圖片，即表示你同意他們的{" "}
          <Link
            href={"https://unsplash.com/license"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            授權
          </Link>{" "}
          和{" "}
          <Link
            href={"https://unsplash.com/terms"}
            target="_blank" //開啟分頁
            rel="noopener noreferrer" //提高安全性，避免新開的分頁能夠存取 window.opener，防止潛在的攻擊。
            className="hover:underline"
          >
            服務規範
          </Link>
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;

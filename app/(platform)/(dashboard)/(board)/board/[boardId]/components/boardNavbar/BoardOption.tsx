"use client";

import { deleteBoard } from "@/aciotns/board/deleteBoard";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings2, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface BoardOptionProps {
  id: string;
}

const BoardOption = ({ id }: BoardOptionProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    const formData = new FormData();
    formData.append("id", id);
    startTransition(async () => {
      try {
        const res = await deleteBoard(formData);
        if (res.success) {
          toast.success("刪除看板成功");
          router.push("/workspace");
        }
      } catch (error) {
        console.error("刪除看板失敗:", error);
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="transparent" className="h-auto w-auto">
          <Settings2 className="h-4 w-4" />
          設定
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-3 ">
        <div className="text-sm font-medium text-center text-aligno-200 pb-4 ">
          設定
        </div>
        <PopoverClose asChild>
          <Button
            variant="transparent"
            className="size-auto p-2 absolute top-2 right-2 text-aligno-200 hover:bg-aligno-500"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <Separator className="my-2 border-white/30 border-t-[0.5px] border-solid" />
        <div>
          <Button
            variant="transparent"
            className="w-full"
            disabled={isPending}
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 text-rose-500" />
            刪除看板
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOption;

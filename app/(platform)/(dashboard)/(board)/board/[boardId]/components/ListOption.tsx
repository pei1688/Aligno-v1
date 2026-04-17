"use client";
import { copyList } from "@/aciotns/list/copyList";
import { deleteList } from "@/aciotns/list/deleteList";
import { DeleteOrCopyListSchema } from "@/aciotns/list/GeneralSchema/DeleteOrCopy-ListSchema";

import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";

import { List } from "@prisma/client";
import { Ellipsis, X } from "lucide-react";
import { ElementRef, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ListOptionProps {
  list: List;
  onAddCard: () => void;
}

const ListOption = ({ list, onAddCard }: ListOptionProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string; id: string; boardId: string }>({
    resolver: zodResolver(DeleteOrCopyListSchema),
    defaultValues: { id: list.id, boardId: list.boardId },
  });
  //新增卡片
  const handleAddCard = () => {
    onAddCard(); 
    closeRef.current?.click(); 
  };
  const onDelete = async (data: { id: string; boardId: string }) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("boardId", data.boardId);
    startTransition(async () => {
      try {
        const res = await deleteList(formData);
        if (res?.error) {
          toast.error(res.error);
          return;
        } else {
          toast.success("刪除列表成功");
          closeRef.current?.click();
        }
      } catch (error) {
        console.error("刪除列表失敗:", error);
      }
    });
  };

  const onCopy = async (data: { id: string; boardId: string }) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("boardId", data.boardId);
    startTransition(async () => {
      try {
        const res = await copyList(formData);
        if (res?.error) {
          toast.error(res.error);
          return;
        } else {
          toast.success("複製列表成功");
          closeRef.current?.click();
        }
      } catch (error) {
        console.error("複製列表失敗:", error);
      }
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3">
        <div className="text-sm font-medium text-center text-neutral-100 mb-4">
          列表動作
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            variant="transparent"
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Separator className=" border-aligno-400/50 border-t-[0.5px] border-solid my-2" />
        <Button
          variant="transparent"
          className="w-full p-2 px-5 rounded-none"
          onClick={handleAddCard}
        >
          新增卡片
        </Button>
        {/*複製*/}
        <form onSubmit={handleSubmit(onCopy)}>
          <input hidden id="id" defaultValue={list.id} />
          <input hidden id="boardId" defaultValue={list.boardId} />
          <SubmitButton
            variant="transparent"
            className="flex justify-start px-5 rounded-none w-full"
          >
            複製列表
          </SubmitButton>
        </form>
        <Separator className=" border-aligno-400/50 border-t-[0.5px] border-solid my-2" />
        {/*刪除*/}
        <form onSubmit={handleSubmit(onDelete)}>
          <input hidden id="id" defaultValue={list.id} />
          <input hidden id="boardId" defaultValue={list.boardId} />
          <SubmitButton
            variant="transparent"
            disabled={isPending}
            className="flex justify-start px-5 rounded-none w-full"
          >
            刪除列表
          </SubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOption;

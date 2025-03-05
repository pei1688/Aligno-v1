"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useCreateWorkspaceFormModal } from "@/hook/useCreateWorkspaceFormModal";
import { ChevronDown, SquareKanban } from "lucide-react";
import Link from "next/link";

interface NavWorkspaceProps {
  id: string;
  title: string;
}

const NavWorkspace = ({ workspaces }: { workspaces: NavWorkspaceProps[] }) => {
  const wsModal = useCreateWorkspaceFormModal();

  return (
    <Popover>
      <PopoverTrigger className="flex items-center rounded-sm bg-aligno-600 px-4 py-1 text-sm font-semibold transition hover:bg-aligno-600/50 sm:bg-transparent">
        <SquareKanban className="mr-1 size-4" />
        <div className="hidden sm:mr-1 sm:flex">工作區</div>
        <ChevronDown className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent align="start" className="px-4 py-3">
        <div className="p-2 text-start text-sm font-medium text-aligno-300">
          您的工作區
        </div>
        <Separator className="my-2 border-t-[0.5px] border-solid border-aligno-400/50" />
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className="my-2 flex flex-col rounded-md text-aligno-200 transition hover:bg-aligno-400/50"
          >
            <PopoverClose asChild>
              <Link href={`/workspace/${workspace.id}`} className="p-2">
                {workspace.title}
              </Link>
            </PopoverClose>
          </div>
        ))}

        <Button
          variant="transparent"
          className="w-full justify-center bg-aligno-500 p-2"
          size="none"
          onClick={wsModal.onOpen}
        >
          建立工作區
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default NavWorkspace;

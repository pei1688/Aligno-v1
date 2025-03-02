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
      <PopoverTrigger className="px-4 py-1 font-semibold text-sm hover:bg-aligno-600/50 rounded-sm transition flex items-center sm:bg-transparent bg-aligno-600">
        <SquareKanban className="size-4 mr-1"/>
        <div className="hidden sm:flex sm:mr-1">工作區</div>
        <ChevronDown className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent align="start" className="px-4 py-3">
        <div className="text-sm font-medium text-start text-aligno-300 p-2 ">
          您的工作區
        </div>
        <Separator className="my-2 border-aligno-400/50 border-t-[0.5px] border-solid" />
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className="flex flex-col my-2 text-aligno-200 hover:bg-aligno-400/50 transition rounded-md"
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
          className="w-full p-2 bg-aligno-500 justify-center"
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

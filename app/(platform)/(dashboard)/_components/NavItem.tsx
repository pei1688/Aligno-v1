"use client";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import FormPopover from "@/components/form/FormPopover";
import UserProfile from "./UserProfile";
import { Separator } from "@/components/ui/separator";
import { useCreateWorkspaceFormModal } from "@/hook/useCreateWorkspaceFormModal";
import { Button } from "@/components/ui/button";

interface WorkspaceProps {
  id: string;
  title: string;
}

interface UserProps {
  id: string;
  given_name: string | null;
  family_name: string | null;
  picture?: string | null;
  email: string | null;
}

const NavItem = ({
  workspaces,
  user,
}: {
  workspaces: WorkspaceProps[];
  user: UserProps;
}) => {
  const wsModal = useCreateWorkspaceFormModal();
  return (
    <>
      <div className=" flex justify-center items-center gap-8 ">
        <Link href="/" className="text-xl flex items-center gap-4">
          <div className="relative h-[20px] w-[40px]">
            <Image
              src={"/logo.svg"}
              alt="logo"
              className="object-cover rounded-md"
              fill
              priority
            />
          </div>
          <h1 className="font-semibold sm:flex hidden text-md">ALIGNO</h1>
        </Link>
        <Popover>
          <PopoverTrigger className="px-4 py-1 font-semibold text-sm hover:bg-aligno-600/50 rounded-sm transition flex items-center">
            工作區
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
                className="flex flex-col my-2 text-aligno-200 hover:bg-aligno-500 transition rounded-md"
              >
                <Link href={`/workspace/${workspace.id}`} className="p-2">
                  {workspace.title}
                </Link>
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

        {/*建立看板*/}
        <FormPopover
          sideOffset={5}
          side="bottom"
          workspaces={workspaces}
          userName={user.given_name || "Guest"}
        >
          <p className="text-sm cursor-pointer bg-aligno-600 px-2 p-1 sm:p-1 rounded-sm hover:bg-aligno-500 ">
            <span className="sm:block hidden">建立新的看板</span>
            <Plus className="h-4 w-4 sm:hidden block" />
          </p>
        </FormPopover>
      </div>
      <div className="flex gap-4 items-center">
        {/*User*/}
        <UserProfile user={user} />
      </div>
    </>
  );
};

export default NavItem;

import Link from "next/link";

import { Plus } from "lucide-react";
import Image from "next/image";
import FormPopover from "@/components/form/Form-Popover";
import UserProfile from "./UserProfile";
import { Suspense } from "react";

import NavWorkspace from "./NavWorkspace";
import NavFavoriteItem from "./NavFavoriteItem";
import Spinner from "@/components/Spinner";

interface WorkspaceProps {
  id: string;
  title: string;
}

export interface favorBoardsProps {
  id: string;
  title: string;
  workspace: {
    title: string;
  };
  imageThumbUrl: string;
  isFavorites: boolean;
}

export interface UserProps {
  id: string;
  given_name: string | null;
  family_name: string | null;
  picture?: string | null;
  email: string | null;
}

const NavList = ({
  workspaces,
  user,
  favorBoards,
}: {
  workspaces: WorkspaceProps[];
  user: UserProps;
  favorBoards: favorBoardsProps[];
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-center gap-6 sm:gap-8">
        <Link href="/workspace" className="flex items-center gap-4 text-xl">
          <div className="relative h-[20px] w-[40px]">
            <Image
              src={"/logo.svg"}
              alt="logo"
              className="rounded-md object-cover"
              fill
              priority
            />
          </div>
          <h1 className="text-md hidden font-semibold sm:flex">ALIGNO</h1>
        </Link>
        {/*工作區*/}
        <NavWorkspace workspaces={workspaces} />
        {/*已標上星號*/}
        <Suspense fallback={<Spinner />}>
          <NavFavoriteItem favorBoards={favorBoards} />
        </Suspense>

        {/*建立看板*/}
        <FormPopover sideOffset={5} side="bottom" workspaces={workspaces}>
          <div className="cursor-pointer rounded-sm border-2 border-focusInput bg-aligno-600 p-1 px-2 text-sm hover:bg-aligno-500 sm:p-1">
            <span className="hidden sm:block">建立新的看板</span>
            <Plus className="block h-4 w-4 sm:hidden" />
          </div>
        </FormPopover>
      </div>
      <div className="flex items-center gap-4">
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default NavList;

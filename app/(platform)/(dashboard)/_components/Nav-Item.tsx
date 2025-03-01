import Link from "next/link";

import { Plus } from "lucide-react";
import Image from "next/image";
import FormPopover from "@/components/form/Form-Popover";
import UserProfile from "./UserProfile";
import { Suspense } from "react";

import NavWorkspace from "./Nav-Workspace";
import NavFavoriteItem from "./Nav-FavoriteItem";
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

const NavItem = ({
  workspaces,
  user,
  favorBoards,
}: {
  workspaces: WorkspaceProps[];
  user: UserProps;
  favorBoards: favorBoardsProps[];
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex justify-center items-center gap-8">
        <Link href="/workspace" className="text-xl flex items-center gap-4">
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
        {/*工作區*/}
        <NavWorkspace workspaces={workspaces} />
        {/*已標上星號*/}
        <Suspense fallback={<Spinner />}>
          <NavFavoriteItem favorBoards={favorBoards} />
        </Suspense>
        {/*建立看板*/}
        <FormPopover sideOffset={5} side="bottom" workspaces={workspaces}>
          <p className="text-sm cursor-pointer bg-aligno-600 px-2 p-1 sm:p-1 rounded-sm hover:bg-aligno-500 ">
            <span className="sm:block hidden">建立新的看板</span>
            <Plus className="h-4 w-4 sm:hidden block" />
          </p>
        </FormPopover>
      </div>
      <div className="flex gap-4 items-center">
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default NavItem;

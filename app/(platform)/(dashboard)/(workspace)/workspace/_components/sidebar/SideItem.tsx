"use client";

import { useState } from "react";
import {
  ChartNoAxesGantt,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Plus,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FormPopover from "@/components/form/FormPopover";
import SideLink from "./SideLink";
import FavorBoardItem from "../FavorBoardItem";
import Image from "next/image";

interface BoardProps {
  id: string;
  title: string;
  isFavorites: boolean;
  imageThumbUrl: string;
}
interface WorkspaceProps {
  title: string;
  id: string;
  description?: string | null;
  createdAt?: Date;
  userId?: string;
  boards?: BoardProps[];
}
interface UserProps {
  id: string;
  given_name: string | null;
}
interface SidebarClientProps {
  workspace: WorkspaceProps;
  workspaces: WorkspaceProps[];
  user: UserProps;
}

const SideItem = ({ workspace, workspaces, user }: SidebarClientProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const links = [
    {
      href: `/workspace/${workspace.id}`,
      icon: LayoutDashboard,
      label: "看板",
      path: "",
    },
    {
      href: `/workspace/${workspace.id}/activity`,
      icon: ChartNoAxesGantt,
      label: "活動",
      path: "/activity",
    },
    {
      href: `/workspace/${workspace.id}/settings`,
      icon: Settings,
      label: "工作區設定",
      path: "/settings",
    },
  ];

  return (
    <div
      className={`h-[calc(100vh-3rem)] bg-aligno-700 relative w-64 shrink-0  flex flex-col transition-all duration-100 border border-aligno-600 border-l-transparent ${
        isCollapsed ? "w-8" : "w-64"
      }`}
    >
      {/* 收合按鈕 */}
      {isCollapsed ? (
        <Button
          className="absolute top-2 right-[-16px] bg-aligno-700 hover:bg-aligno-600 rounded-full p-1 shadow-md transition-all border border-aligno-300/70"
          onClick={() => setIsCollapsed(!isCollapsed)}
          size="none"
        >
          <ChevronRight className="w-8 h-5 " />
        </Button>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center px-4">
            <div className="w-[32px] h-[32px] relative ">
              <Image
                src={"https://avatar.vercel.sh/rauchg"}
                alt="vercel"
                sizes="auto"
                className="rounded-md object-cover"
                fill
              />
            </div>
            <h2 className="px-4 py-2 text-lg font-semibold">
              {workspace.title}
            </h2>
          </div>
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="transparent"
            size="none"
            className="p-2 mr-2"
          >
            <ChevronLeft className="w-5 h-5 " />
          </Button>
        </div>
      )}
      {!isCollapsed && (
        <>
          <Separator className="mb-8 border-aligno-400/50 border-t-[0.5px] border-solid" />
          {/* 選單連結 */}
          {links.map((link) => (
            <SideLink
              key={link.label}
              href={link.href}
              icon={link.icon}
              label={isCollapsed ? "" : link.label}
              path={link.path}
            />
          ))}
        </>
      )}

      {/* 看板區域 */}
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex items-center justify-between px-2">
          {!isCollapsed && (
            <>
              <h3 className="text-sm px-2">你的看板</h3>
              <FormPopover
                sideOffset={5}
                side="bottom"
                workspaces={workspaces}
                userName={user.given_name}
              >
                <Plus className="h-4 w-4 cursor-pointer" />
              </FormPopover>
            </>
          )}
        </div>

        {/* 看板列表 */}
        {!isCollapsed && (
          <div className="space-y-2">
            {workspace.boards && workspace.boards.length > 0
              ? workspace.boards.map((board) => (
                  <FavorBoardItem
                    key={board.id}
                    id={board.id}
                    title={board.title}
                    image={board.imageThumbUrl}
                    isFavorite={board.isFavorites}
                  />
                ))
              : !isCollapsed && (
                  <p className="text-sm text-aligno-300 px-2">尚無看板</p>
                )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideItem;

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
import FormPopover from "@/components/form/Form-Popover";

import Image from "next/image";
import SideLink from "./SideBar-Link";
import SideBoardList from "./SideBar-BoardList";

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

interface SidebarClientProps {
  workspace: WorkspaceProps;
  workspaces: WorkspaceProps[];
}

const SideItem = ({ workspace, workspaces }: SidebarClientProps) => {
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
      className={`relative flex h-full w-64 shrink-0 flex-col border border-aligno-600 border-b-transparent border-l-transparent bg-aligno-700 transition-all duration-100 sm:min-h-[calc(100vh-3rem)] ${
        isCollapsed ? "w-[20px]" : "w-64"
      }`}
    >
      {/* 收合按鈕 */}
      {isCollapsed ? (
        <Button
          className="absolute right-[-16px] top-2 rounded-full border border-aligno-300/70 bg-aligno-700 p-1 shadow-md transition-all hover:bg-aligno-600"
          onClick={() => setIsCollapsed(!isCollapsed)}
          size="none"
        >
          <ChevronRight className="h-5 w-8" />
        </Button>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center px-4">
            <div className="relative h-[32px] w-[32px]">
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
            className="mr-2 p-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
      )}
      {!isCollapsed && (
        <>
          <Separator className="mb-8 border-t-[0.5px] border-solid border-aligno-400/50" />
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
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          {!isCollapsed && (
            <>
              <h3 className="px-2 text-sm">你的看板</h3>
              <FormPopover sideOffset={5} side="bottom" workspaces={workspaces}>
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
                  <SideBoardList
                    key={board.id}
                    id={board.id}
                    title={board.title}
                    image={board.imageThumbUrl}
                    isFavorite={board.isFavorites}
                  />
                ))
              : !isCollapsed && (
                  <p className="px-2 text-sm text-aligno-300">尚無看板</p>
                )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideItem;

"use client";
import FormPopover from "@/components/form/Form-Popover";
import { Workspace } from "@prisma/client";
import { useMediaQuery } from "usehooks-ts";

interface CreateBoardProps {
  workspaces: Workspace[];
  isPremium: boolean;
  MAX_FREE_BOARDS: number;
  availableCount: number;
}

const CreateBoard = ({
  workspaces,
  isPremium,
  MAX_FREE_BOARDS,
  availableCount,
}: CreateBoardProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <FormPopover
      sideOffset={isMobile ? -200 : 5}
      side={isMobile ? "bottom" : "right"}
      workspaces={workspaces}
    >
      <div
        role="button"
        className="aspect-video h-[100px] size-full bg-aligno-600 rounded-lg flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition text-aligno-200/70 shadow-lg"
      >
        <p className="text-xs">建立新的看板</p>
        <p className="text-xs mt-2 text-orange-300 font-semibold">
          {isPremium
            ? "Premium"
            : `還可以擁有${MAX_FREE_BOARDS - availableCount}個免費工作區`}
        </p>
      </div>
    </FormPopover>
  );
};

export default CreateBoard;

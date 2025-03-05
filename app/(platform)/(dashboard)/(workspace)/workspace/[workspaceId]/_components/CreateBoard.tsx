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
        className="flex aspect-video size-full h-[100px] flex-col items-center justify-center gap-y-1 rounded-lg bg-aligno-600 text-aligno-200/70 shadow-lg transition hover:opacity-75"
      >
        <p className="text-xs">建立新的看板</p>
        <p className="mt-2 text-xs font-semibold text-orange-300">
          {isPremium
            ? "Premium"
            : `還可以擁有${MAX_FREE_BOARDS - availableCount}個免費工作區`}
        </p>
      </div>
    </FormPopover>
  );
};

export default CreateBoard;

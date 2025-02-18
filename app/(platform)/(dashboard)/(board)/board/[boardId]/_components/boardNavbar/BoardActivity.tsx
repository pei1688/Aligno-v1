import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Activity, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import db from "@/lib/db";
import ActivityItem from "@/components/ActivityItem";

interface BoardActProps {
  id: string;
}
const BoardActivity = async ({ id }: BoardActProps) => {
  const actLogs = await db.activityLog.findMany({
    where: {
      boardId: id,
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <Popover>
      <PopoverTrigger className="flex items-center text-sm" asChild>
        <Button variant="transparent">
          <Activity className="h-4 w-6" />
          活動
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-3 text-aligno-200 w-full">
        <div className="text-sm font-medium text-center pb-4 ">活動</div>
        <PopoverClose asChild>
          <Button
            variant="transparent"
            className="size-auto p-2 absolute top-2 right-2 text-aligno-200 hover:bg-aligno-500"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <Separator className="my-2 border-white/30 border-t-[0.5px] border-solid" />
        <div className="p-4 max-h-[500px] overflow-auto">
          {actLogs.map((act) => (
            <ActivityItem key={act.id} act={act} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BoardActivity;

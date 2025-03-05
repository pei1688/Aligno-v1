import { ActivityLog } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { logMessage } from "@/lib/logMessage";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
interface ActProps {
  act: ActivityLog;
}

const ActivityItem = ({ act }: ActProps) => {
  return (
    <li className="flex items-center gap-x-2 space-y-4">
      <Avatar className="h-6 w-6">
        <AvatarImage src={act.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm">
          <span className="font-semibold lowercase">{act.userName}</span>
          {logMessage(act)}
        </p>
        <p className="cursor-pointer text-xs text-aligno-300/70 hover:underline">
          {format(new Date(act.createdAt), "MMM d日, yyyy '於' a h:mm", {
            locale: zhTW,
          })}
        </p>
      </div>
    </li>
  );
};

export default ActivityItem;

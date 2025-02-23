import db from "@/lib/db";
import { subscription } from "@/lib/subscription";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CreditCard } from "lucide-react";
import Image from "next/image";

interface WorkProps {
  workspaceId: string;
}
const WorkspaceInfo = async ({ workspaceId}: WorkProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // 這裡統一查詢 workspace 和 subscription，避免重複請求
  const workspace = await db.workspace.findFirst({
    where: {
      id: workspaceId,
      userId: user.id,
    },
  });
  if (!workspace) {
    return <p className="text-gray-500 text-center">工作區不存在</p>;
  }
  const isPremium = await subscription(workspaceId);
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-4">
        <div className="w-[60px] h-[60px] relative sm:w-[80px] sm:h-[80px]">
          <Image
            src={"https://avatar.vercel.sh/rauchg"}
            alt="vercel"
            sizes="auto"
            className="rounded-md object-cover"
            fill
          />
        </div>
        <div className="space-y-1 flex flex-col">
          <p className="font-semibold text-xl sm:text-2xl">{workspace.title}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <CreditCard className="h-3 w-3 mr-1" />
            {isPremium ? "Premium" : "免費"}
          </div>
        </div>
      </div>
      {workspace.description && (
        <div className="text-sm mt-2 sm:text-base">{workspace.description}</div>
      )}
    </div>
  );
};

export default WorkspaceInfo;

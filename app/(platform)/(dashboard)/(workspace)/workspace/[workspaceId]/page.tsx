import WorkspaceInfo from "./_components/WorkspaceInfo";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { BoardList } from "./_components/BoardList";
import db from "@/lib/db";
import { subscription } from "@/lib/subscription";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const WorkspaceIdPage = async ({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) => {
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
    <div className="w-full max-w-[1200px] mx-auto px-4 mt-8">
      <div className="flex flex-col lg:items-start lg:gap-8">
        <div className="w-full lg:w-[300px]">
          <WorkspaceInfo workspace={workspace} isPremium={isPremium} />
        </div>

        <div className="space-y-4 size-full">
          <Separator className="my-8 border-aligno-400/50 border-t-[0.5px] border-solid" />
          <div className="font-semibold text-lg text-white/60 flex items-center gap-2">
            看板
          </div>
          <Suspense fallback={<Spinner />}>
            <BoardList workspaceId={workspaceId} isPremium={isPremium} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceIdPage;

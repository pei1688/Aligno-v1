import db from "@/lib/db";
import WorkspaceInfo from "./_components/WorkspaceInfo";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { BoardList } from "./_components/BoardList";
import { subscription } from "@/lib/subscription";

const WorkspaceIdPage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  // 只查詢一次，避免 `BoardList` 內部重複查詢
  const workspaces = await db.workspace.findMany();

  // 從已查詢的 `workspaces` 找到當前的 `workspace`
  const workspace = workspaces.find((w) => w.id === params.workspaceId);

  if (!workspace) {
    return <p className="text-gray-500 text-center">看板不存在</p>;
  }
  const isPremium = await subscription(params.workspaceId);
  const workspaceWithPremium = { ...workspace, isPremium };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 mt-8">
      {/* 大螢幕時左右排列 */}
      <div className="flex flex-col lg:items-start lg:gap-8">
        {/* 左側 - 工作區資訊 */}
        <div className="w-full lg:w-[300px]">
          <WorkspaceInfo workspace={workspaceWithPremium} />
        </div>

        {/* 右側 - 看板列表 */}
        <div className="space-y-4 size-full">
          <Separator className="my-8 border-aligno-400/50 border-t-[0.5px] border-solid" />
          <div className="font-semibold text-lg text-white/60 flex items-center gap-2">
            看板
          </div>
          <Suspense fallback={<Spinner />}>
            <BoardList id={workspace.id} workspaces={workspaces} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceIdPage;

import db from "@/lib/db";
import WorkspaceInfo from "../_components/WorkspaceInfo";
import { Separator } from "@/components/ui/separator";
import ActivityList from "./_components/ActivityList";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { subscription } from "@/lib/subscription";

const ActivityPage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  const workspace = await db.workspace.findUnique({
    where: { id: params.workspaceId },
  });

  if (!workspace) {
    return <p className="text-gray-500">看板不存在</p>;
  }
  const isPremium = await subscription(params.workspaceId);
  const workspaceWithPremium = { ...workspace, isPremium };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 mt-8">
      <div className="w-full lg:w-[300px]">
        <WorkspaceInfo workspace={workspaceWithPremium} />
      </div>
      <Separator className="mt-16 mb-8 border-white/30 border-t-[0.5px] border-solid" />
      <Suspense fallback={<Spinner />}>
        <ActivityList workspaceId={params.workspaceId} />
      </Suspense>
    </div>
  );
};

export default ActivityPage;

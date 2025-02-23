import WorkspaceInfo from "./_components/WorkspaceInfo";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { BoardList } from "./_components/BoardList";

const WorkspaceIdPage = async ({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) => {


  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 mt-8">
      <div className="flex flex-col lg:items-start lg:gap-8">
        <div className="w-full lg:w-[300px]">
          <Suspense fallback={<Spinner />}>
            <WorkspaceInfo workspaceId={workspaceId} />
          </Suspense>
        </div>

        <div className="space-y-4 size-full">
          <Separator className="my-8 border-aligno-400/50 border-t-[0.5px] border-solid" />
          <div className="font-semibold text-lg text-white/60 flex items-center gap-2">
            看板
          </div>
          <Suspense fallback={<Spinner />}>
            <BoardList workspaceId={workspaceId}  />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceIdPage;

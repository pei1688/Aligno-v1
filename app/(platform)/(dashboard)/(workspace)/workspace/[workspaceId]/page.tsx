import WorkspaceInfo from "./_components/WorkspaceInfo";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { BoardList } from "./_components/BoardList";
import SearchInput from "./_components/SearchInput";
import SortFilter from "./_components/SortFilter";

const WorkspaceIdPage = async ({
  params: { workspaceId },
  searchParams,
}: {
  params: { workspaceId: string };
  searchParams: { board?: string; sort?: string };
}) => {
  const boardQuery = searchParams?.board || "";
  const sortQuery = searchParams?.sort || "NC-OC";

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
          <div className="font-semibold text-xl text-aligno-300 flex items-center gap-2">
            看板
          </div>
          <div className="flex items-center flex-wrap justify-between ">
            <SortFilter />
            <SearchInput />
          </div>
          <Suspense fallback={<Spinner />}>
            <BoardList
              workspaceId={workspaceId}
              boardQuery={boardQuery}
              sortQuery={sortQuery}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceIdPage;

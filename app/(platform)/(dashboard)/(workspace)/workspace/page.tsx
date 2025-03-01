import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import WorkspaceList from "./_components/WorkspaceList";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/Spinner";
import CreateWorkspace from "./_components/CreateWorkspace";
import FavorBoardList from "./_components/FavorBoardList";
import { Star } from "lucide-react";
import db from "@/lib/db";

const WorkspacePage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  const initFavorBoards = await db.board.findMany({
    where: {
      isFavorites: true, // 直接查詢收藏的看板
      workspace: {
        userId: user.id, // 限制為該使用者的工作區
      },
    },
    select: {
      id: true, // 看板ID
      title: true, // 看板標題
      imageThumbUrl: true, // 看板縮圖URL
      isFavorites: true, // 是否收藏
      workspace: {
        select: {
          title: true, // 工作區標題
        },
      },
    },
  });

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center mt-20 px-6">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl justify-between">
        {/* 左側 - 工作區列表 */}
        <div className="w-full lg:w-[250px] space-y-4 md:mb-0 mb-4">
          <h2 className="text-sm px-2">工作區列表</h2>
          <Separator className="mt-4 border-aligno-400/50 border-t-[0.5px] border-solid " />
          <Suspense fallback={<Spinner />}>
            <WorkspaceList id={user.id} />
          </Suspense>
        </div>
        {/* 中間 - 在手機時顯示在最上方 */}
        <div className="order-[-1] lg:order-none">
          <CreateWorkspace user={user} />
        </div>

        {/* 右側 */}
        <div className="flex flex-col lg:w-[300px]">
          <h2 className="flex items-center gap-2 text-sm mb-4 px-2 ">
            <Star className="h-4 w-4" />
            收藏的看板
          </h2>
          <Suspense fallback={<Spinner />}>
            <FavorBoardList id={user.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;

import db from "@/lib/db";
import { getAvailableCount } from "@/lib/workspaceLimit";
import { MAX_FREE_BOARDS } from "@/constants/board";
import BoardCard from "./BoardCard";
import CreateBoard from "./CreateBoard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const BoardList = async ({
  workspaceId,
  isPremium,
}: {
  workspaceId: string;
  isPremium: boolean;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const workspacesPromise = db.workspace.findMany({
    where: { userId: user.id },
  });

  const [availableCount, workspaces] = await Promise.all([
    getAvailableCount(workspaceId),
    workspacesPromise,
  ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <CreateBoard
        workspaces={workspaces}
        isPremium={isPremium} // 直接使用父組件傳遞的 isPremium
        MAX_FREE_BOARDS={MAX_FREE_BOARDS}
        availableCount={availableCount}
      />
      <BoardCard workspaceId={workspaceId} />
    </div>
  );
};

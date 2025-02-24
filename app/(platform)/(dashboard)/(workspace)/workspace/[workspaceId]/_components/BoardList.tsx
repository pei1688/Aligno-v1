import db from "@/lib/db";
import { getAvailableCount } from "@/lib/workspaceLimit";
import { MAX_FREE_BOARDS } from "@/constants/board";
import BoardCard from "./BoardCard";
import CreateBoard from "./CreateBoard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { subscription } from "@/lib/subscription";

export const BoardList = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const boardsPromise = db.board.findMany({
    where: { workspaceId },
    orderBy: { createdAt: "asc" },
  });

  const workspacesPromise = db.workspace.findMany({
    where: { userId: user.id },
  });

  const [boards, availableCount, workspaces] = await Promise.all([
    boardsPromise,
    getAvailableCount(workspaceId),
    workspacesPromise,
  ]);
  const isPremium = await subscription(workspaceId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <CreateBoard
        workspaces={workspaces}
        isPremium={isPremium} 
        MAX_FREE_BOARDS={MAX_FREE_BOARDS}
        availableCount={availableCount}
      />

      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};

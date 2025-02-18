import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { getAvailableCount } from "@/lib/workspaceLimit";
import { MAX_FREE_BOARDS } from "@/constants/board";
import { subscription } from "@/lib/subscription";
import BoardCard from "./BoardCard";
import CreateBoard from "./CreateBoard";

export interface WorkspacesProps {
  title: string;
  id: string;
  createdAt: Date;
  description: string | null;
  userId: string;
}

export const BoardList = async ({
  id,
  workspaces,
}: {
  id: string;
  workspaces: WorkspacesProps[];
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  const boards = await db.board.findMany({
    where: { workspaceId: id },
  });

  const availableCount = await getAvailableCount(id);
  const isPremium = await subscription(id);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* 新建看板按钮 */}
      <CreateBoard
        workspaces={workspaces}
        user={user}
        isPremium={isPremium}
        MAX_FREE_BOARDS={MAX_FREE_BOARDS}
        availableCount={availableCount}
      />

      {/* 看板列表 */}
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};

import db from "@/lib/db";
import BoardNavbar from "./components/boardNavbar/BoardNavbar";
import { notFound } from "next/navigation";
import { startCase } from "lodash";
import Sidebar from "../../../(workspace)/workspace/[workspaceId]/_components/sidebar/SideBar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;
  const board = await db.board.findUnique({
    where: { id: boardId },
  });
  return {
    title: startCase(board?.title || "Aligno"),
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ boardId: string }>;
}) => {
  const { boardId } = await params;
  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
    select: {
      workspaceId: true,
      imageFullUrl: true,
      title: true,
      id: true,
    },
  });
  if (!board) {
    notFound();
  }

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative h-full bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-aligno-800/10" />
      {/* 主要內容*/}
      <div className="relative flex w-full overflow-hidden">
        {/* Sidebar  */}
        <div className="z-50">
          <Sidebar workspaceId={board.workspaceId} />
        </div>
        {/* 右側內容區域 */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* BoardNavbar  */}
          <BoardNavbar
            title={board.title}
            id={board.id}
            workspaceId={board.workspaceId}
          />
          {/* 主要內容區域 */}
          <main className="mt-8 h-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default BoardIdLayout;

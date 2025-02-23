import db from "@/lib/db";
import BoardNavbar from "./_components/boardNavbar/BoardNavbar";
import { notFound } from "next/navigation";
import { startCase } from "lodash";
import Sidebar from "../../../(workspace)/workspace/_components/sidebar/Sidebar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const board = await db.board.findUnique({
    where: { id: params.boardId },
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
  params: { boardId: string };
}) => {
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
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
      className="relative h-full bg-no-repeat bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-aligno-800/10" />
      {/* 主要內容*/}
      <div className="relative flex w-full overflow-hidden">
        {/* Sidebar  */}
        <div className="z-50">
          <Sidebar workspaceId={board.workspaceId} />
        </div>
        {/* 右側內容區域 */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* BoardNavbar  */}
          <BoardNavbar
            title={board.title}
            id={board.id}
            workspaceId={board.workspaceId}
          />
          {/* 主要內容區域 */}
          <main className=" mt-8 h-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default BoardIdLayout;

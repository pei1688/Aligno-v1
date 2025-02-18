import db from "@/lib/db";
import BoadrNavbar from "./_components/boardNavbar/BoadrNavbar";
import { notFound } from "next/navigation";
import { startCase } from "lodash";

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
      <BoadrNavbar
        title={board.title}
        id={board.id}
        workspaceId={board.workspaceId}
      />
      <div className="absolute inset-0 bg-aligno-800/10" />
      <main className="relative pt-14 h-[calc(100vh-3rem)]">{children}</main>
    </div>
  );
};

export default BoardIdLayout;

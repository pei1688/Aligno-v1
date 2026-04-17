import db from "@/lib/db";
import ListContainer from "./components/ListContainer";

interface BoardIdProps {
  params: Promise<{
    boardId: string;
  }>;
}

const BoardIdPage = async ({ params }: BoardIdProps) => {
  const { boardId } = await params;
  const lists = await db.list.findMany({
    where: {
      boardId,
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="min-h-[calc(100vh-10rem)] overflow-y-auto p-4 sm:h-full">
      <ListContainer boardId={boardId} lists={lists} />
    </div>
  );
};

export default BoardIdPage;

import db from "@/lib/db";
import ListContainer from "./_components/ListContainer";

interface BoardIdProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdProps) => {
  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
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
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={params.boardId} lists={lists} />
    </div>
  );
};

export default BoardIdPage;

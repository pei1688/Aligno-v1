import db from "@/lib/db";
import FavorBoardItem from "./FavorBoardItem";

interface User {
  id: string;
}

const FavorBoardList = async ({ id }: User) => {
  const favorBoards = await db.board.findMany({
    where: {
      isFavorites: true,
      workspace: {
        userId: id,
      },
    },
    select: {
      id: true,
      title: true,
      imageThumbUrl: true,
      isFavorites: true,
      workspace: {
        select: {
          title: true,
        },
      },
    },
  });

  return (
    <>
      {favorBoards.length > 0 ? (
        <div className="flex w-full flex-wrap gap-4">
          {favorBoards.map((board) => (
            <FavorBoardItem
              key={board.id}
              id={board.id}
              title={board.title}
              image={board.imageThumbUrl}
              isFavorite={board.isFavorites}
              workspace={board.workspace.title}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-aligno-300 px-2">沒有收藏的看板</p>
      )}
    </>
  );
};

export default FavorBoardList;

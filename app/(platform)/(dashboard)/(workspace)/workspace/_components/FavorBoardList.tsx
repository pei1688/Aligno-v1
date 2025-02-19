import db from "@/lib/db";
import FavorBoardItem from "./FavorBoardItem";

interface User {
  id: string;
}

const FavorBoardList = async ({ id }: User) => {
  const workspaces = await db.workspace.findMany({
    where: {
      userId: id,
    },
    include: {
      boards: {
        select: {
          id: true,
          title: true,
          imageThumbUrl: true,
          isFavorites: true,
        },
      },
    },
  });
  // 將所有 workspace 的收藏看板展開成單一陣列，只保留 isFavorites 為 true 的項目
  const favorBoards = workspaces
    .flatMap((workspace) => workspace.boards)
    .filter((board) => board.isFavorites);
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

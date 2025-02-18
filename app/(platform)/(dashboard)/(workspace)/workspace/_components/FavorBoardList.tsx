import db from "@/lib/db";
import FavorBoardItem from "./FavorBoardItem";

const FavorBoardList = async () => {
  const favorBoard = await db.board.findMany({
    where: {
      isFavorites: true,
    },
    select: { id: true, title: true, imageThumbUrl: true },
  });
  return (
    <>
      {favorBoard.length > 0 ? (
        <div className="flex w-full flex-wrap gap-4">
          {favorBoard.map((board) => (
            <FavorBoardItem
              key={board.id}
              id={board.id}
              title={board.title}
              image={board.imageThumbUrl}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-aligno-300">沒有已收藏的看板</p>
      )}
    </>
  );
};

export default FavorBoardList;

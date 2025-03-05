"use client";

import { Board } from "@prisma/client";
import { Star } from "lucide-react";
import Link from "next/link";
import { useFavorToggle } from "@/hook/useFavorToggle";
export type BoardPreview = Pick<
  Board,
  "id" | "title" | "imageThumbUrl" | "isFavorites"
>;
interface BoardCardProps {
  board: BoardPreview;
}

const BoardCard = ({ board }: BoardCardProps) => {
  const { optimisticFavorite, handleToggleFavorite } = useFavorToggle(
    board.id,
    board.isFavorites,
  );

  return (
    <Link
      key={board.id}
      href={`/board/${board.id}`}
      className="group relative aspect-video h-[100px] w-full overflow-hidden rounded-lg bg-aligno-500 bg-cover bg-center bg-no-repeat p-2 shadow-lg"
      style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
    >
      <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
      <p className="relative font-semibold text-aligno-200">{board.title}</p>
      <button onClick={handleToggleFavorite}>
        <Star
          className={`absolute bottom-2 right-2 h-5 w-5 text-yellow-400 transition hover:scale-110 ${
            optimisticFavorite
              ? "fill-yellow-400 hover:fill-transparent"
              : "hover:fill-yellow-400"
          }`}
        />
      </button>
    </Link>
  );
};

export default BoardCard;

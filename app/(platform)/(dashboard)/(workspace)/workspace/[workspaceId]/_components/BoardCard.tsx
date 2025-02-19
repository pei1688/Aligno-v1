"use client";

import { toggleFavorite } from "@/aciotns/board/toggleFavorite";
import { useOptimistic } from "react";
import { Board } from "@prisma/client";
import { Star } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

interface BoardCardProps {
  board: Board;
}

const BoardCard = ({ board }: BoardCardProps) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticFavorite, toggleOptimisticFavorite] = useOptimistic(
    board.isFavorites,
    (curr, action: boolean) => action
  );

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // 防止點擊 Star 時跳轉
    startTransition(async () => {
      toggleOptimisticFavorite(!optimisticFavorite);
      const res = await toggleFavorite(board.id);
      if (res.error) {
        toggleOptimisticFavorite(optimisticFavorite);
        toast.error(res.error);
        return;
      }
    });
  };

  return (
    <Link
      key={board.id}
      href={`/board/${board.id}`}
      className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-aligno-500 rounded-lg w-full h-[100px] p-2 overflow-hidden shadow-lg"
      style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
    >
      <div className="absolute inset-0 transition bg-black/30 group-hover:bg-black/40" />
      <p className="relative font-semibold text-aligno-200">{board.title}</p>
      <button onClick={handleToggleFavorite} disabled={isPending}>
        <Star
          className={`h-4 w-4 absolute bottom-2 right-2 text-yellow-400 hover:scale-110 transition  ${
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

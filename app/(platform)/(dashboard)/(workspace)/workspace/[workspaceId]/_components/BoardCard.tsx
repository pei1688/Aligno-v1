"use client";

import { toggleFavorite } from "@/aciotns/board/toggleFavorite";

import { Board } from "@prisma/client";
import { Star } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface BoardCardProps {
  board: Board;
}

const BoardCard = ({ board }: BoardCardProps) => {
  const [isPending, startTransition] = useTransition();
  const [isFavorite, setIsFavorite] = useState(board.isFavorites);

  const handleToggleFavorite = async () => {
    startTransition(async () => {
      const res = await toggleFavorite(board.id);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setIsFavorite(res.data!);
      toast.success(`已${res.data ? "加入" : "移除"}收藏`);
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
      <button
        onClick={(e) => {
          e.preventDefault(); // 防止點擊 Star 時跳轉
          handleToggleFavorite();
        }}
        disabled={isPending}
      >
        <Star
          className={`h-4 w-4 absolute bottom-2 right-2 text-yellow-400 hover:scale-110 transition  ${
            isFavorite
              ? "fill-yellow-400 hover:fill-transparent"
              : "hover:fill-yellow-400"
          }`}
        />
      </button>
    </Link>
  );
};

export default BoardCard;

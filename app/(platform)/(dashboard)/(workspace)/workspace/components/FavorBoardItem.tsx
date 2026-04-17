"use client";

import { useFavorToggle } from "@/hook/useFavorToggle";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FavorBoardItemProps {
  id: string;
  title: string;
  image: string;
  isFavorite: boolean;
  workspace: string;
}

const FavorBoardItem = ({
  id,
  title,
  image,
  isFavorite,
  workspace,
}: FavorBoardItemProps) => {
  const { optimisticFavorite, handleToggleFavorite } = useFavorToggle(
    id,
    isFavorite,
  );

  if (!optimisticFavorite) return null;
  return (
    <div className="group flex w-full cursor-pointer items-center justify-between rounded-sm px-4 py-1 transition-all hover:bg-aligno-400/50">
      <Link href={`/board/${id}`} className="flex items-center">
        <div className="relative h-[25px] w-[40px] overflow-hidden rounded-sm">
          <Image
            src={image}
            alt={title}
            sizes="auto"
            className="h-full w-full object-cover"
            fill
          />
        </div>
        <div className="flex max-w-[150px] flex-col truncate px-2 text-sm font-semibold text-aligno-200">
          <span>{title}</span>
          <span className="text-[10px] text-aligno-300">{workspace}</span>
        </div>
      </Link>
      {/* 收藏按鈕 */}
      <button onClick={handleToggleFavorite}>
        <Star
          className={`h-5 w-5 opacity-0 transition group-hover:opacity-100 ${
            optimisticFavorite
              ? "fill-yellow-500 text-yellow-500 opacity-100 hover:fill-transparent"
              : "text-aligno-300 hover:fill-aligno-300"
          }`}
        />
      </button>
    </div>
  );
};

export default FavorBoardItem;

"use client";

import { useFavorToggle } from "@/hook/useFavorToggle";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SideBoardListProps {
  id: string;
  title: string;
  image: string;
  isFavorite: boolean;
}

const SideBoardList = ({
  id,
  title,
  image,
  isFavorite,
}: SideBoardListProps) => {
  const { optimisticFavorite, handleToggleFavorite } = useFavorToggle(
    id,
    isFavorite,
  );

  return (
    <div className="group flex w-full cursor-pointer items-center justify-between rounded-sm px-4 py-1 transition-all hover:bg-aligno-600">
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
        <p className="max-w-[100px] truncate px-2 text-sm font-semibold text-aligno-200">
          {title}
        </p>
      </Link>
      {/* 收藏按鈕 */}
      <button onClick={handleToggleFavorite}>
        <Star
          className={`h-5 w-5 opacity-0 transition group-hover:opacity-100 ${
            optimisticFavorite
              ? "fill-yellow-500 text-yellow-500 opacity-100 hover:fill-yellow-500"
              : "text-aligno-300 hover:fill-aligno-300"
          }`}
        />
      </button>
    </div>
  );
};

export default SideBoardList;

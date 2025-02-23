"use client";

import Spinner from "@/components/Spinner";
import { useFavorToggle } from "@/hook/useFavorToggle";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface FavorBoardItem {
  id: string;
  title: string;
  image: string;
  isFavorite: boolean;
}

const FavorBoardItem = ({ id, title, image, isFavorite }: FavorBoardItem) => {
  const { isPending, optimisticFavorite, handleToggleFavorite } =
    useFavorToggle(id, isFavorite);
  return (
    <div className="flex items-center justify-between w-full  hover:bg-aligno-600 rounded-sm transition-all py-1 px-4  cursor-pointer group">
      <Link href={`/board/${id}`} className="flex items-center">
        <div className="relative h-[25px] w-[40px] rounded-sm overflow-hidden">
          <Image
            src={image}
            alt={title}
            sizes="auto"
            className="object-cover w-full h-full"
            fill
          />
        </div>
        <p className="font-semibold text-aligno-200 px-2 text-sm truncate max-w-[100px]">
          {title}
        </p>
      </Link>
      {/* 收藏按鈕 */}
      <button onClick={handleToggleFavorite}>
        {isPending ? (
          <Spinner />
        ) : (
          <Star
            className={`h-5 w-5 transition text-yellow-500 opacity-0 group-hover:opacity-100  ${
              optimisticFavorite
                ? "fill-yellow-500 hover:fill-yellow-500 opacity-100"
                : "hover:fill-yellow-500"
            }`}
          />
        )}
      </button>
    </div>
  );
};

export default FavorBoardItem;

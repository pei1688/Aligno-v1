"use client";

import { toggleFavorite } from "@/aciotns/board/toggleFavorite";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

interface FavorBoardItem {
  id: string;
  title: string;
  image: string;
  isFavorite: boolean;
}

const FavorBoardItem = ({ id, title, image, isFavorite }: FavorBoardItem) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticFavorite, toggleOptimisticFavorite] = useOptimistic(
    isFavorite,
    (curr, action: boolean) => action
  );
  const handleToggleFavorite = async () => {
    startTransition(async () => {
      toggleOptimisticFavorite(!optimisticFavorite);
      const res = await toggleFavorite(id);
      if (res.error) {
        toggleOptimisticFavorite(optimisticFavorite);
        toast.error(res.error);
        return;
      }
    });
  };
  return (
    <div className="flex items-center justify-between w-full lg:w-[200px] hover:bg-aligno-600 rounded-lg transition-all p-2 cursor-pointer">
      <Link href={`/board/${id}`} className="flex items-center">
        <div className="relative h-[30px] w-[50px] rounded-md overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="object-cover w-full h-full"
            fill
          />
        </div>
        <p className="font-semibold text-aligno-200 px-2 text-sm">{title}</p>
      </Link>
      {/* 收藏按鈕 */}
      <button onClick={handleToggleFavorite} disabled={isPending}>
        <Star className="h-4 w-4 text-yellow-400 hover:scale-110 transition fill-yellow-400 hover:fill-transparent" />
      </button>
    </div>
  );
};

export default FavorBoardItem;

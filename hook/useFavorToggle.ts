"use client";

import { toggleFavorite } from "@/aciotns/board/toggleFavorite";
import { useCallback, useOptimistic, useTransition } from "react";
import { toast } from "sonner";

export const useFavorToggle = (boardId: string, isFavorite: boolean) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticFavorite, toggleOptimisticFavorite] = useOptimistic(
    isFavorite,
    (curr, action: boolean) => action
  );
  const handleToggleFavorite = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault(); // 防止點擊 Star 時跳轉
      startTransition(async () => {
        toggleOptimisticFavorite(!optimisticFavorite);
        const res = await toggleFavorite(boardId);
        if (res.error) {
          toggleOptimisticFavorite(optimisticFavorite!);
          toast.error(res.error);
          return;
        }
      });
    },
    [boardId, optimisticFavorite, toggleOptimisticFavorite]
  );
  return { isPending, handleToggleFavorite, optimisticFavorite };
};

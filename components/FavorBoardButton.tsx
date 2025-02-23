"use client";

import { toggleFavorite } from "@/aciotns/board/toggleFavorite";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useOptimistic, useTransition } from "react";
import { toast } from "sonner";

export interface FavoriteToggleRenderProps {
  isPending: boolean;
  optimisticFavorite: boolean;
  handleToggle: (e: React.MouseEvent) => void;
}

export interface FavoriteToggleProps {
  id: string;
  isFavorite: boolean;
  /**
   * 若需要在切換成功後使其他查詢失效，可傳入 invalidateQueries 的 queryKey
   */
  invalidateQueries?: { queryKey: any };
  /**
   * 切換成功後的回調，可用來做額外處理
   */
  onToggleSuccess?: (newState: boolean) => void;
  /**
   * 透過 render props 自訂渲染內容
   */
  children: (props: FavoriteToggleRenderProps) => React.ReactNode;
}

const FavorBoardButton: React.FC<FavoriteToggleProps> = ({
  id,
  isFavorite,
  invalidateQueries,
  onToggleSuccess,
  children,
}) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const [optimisticFavorite, toggleOptimisticFavorite] = useOptimistic(
    isFavorite,
    (_curr, action: boolean) => action
  );

  const handleToggle = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      startTransition(async () => {
        const newFavoriteState = !optimisticFavorite;
        // 樂觀更新 UI
        toggleOptimisticFavorite(newFavoriteState);
        const res = await toggleFavorite(id);
        if (res.error) {
          // 發生錯誤時回復原狀
          toggleOptimisticFavorite(optimisticFavorite);
          toast.error(res.error);
          return;
        }
        if (invalidateQueries) {
          queryClient.invalidateQueries({
            queryKey: invalidateQueries.queryKey,
          });
        }
        if (onToggleSuccess) {
          onToggleSuccess(newFavoriteState);
        }
        toast.success(newFavoriteState ? "已加入收藏" : "已移除收藏");
      });
    },
    [
      id,
      optimisticFavorite,
      toggleOptimisticFavorite,
      queryClient,
      invalidateQueries,
      onToggleSuccess,
    ]
  );

  return <>{children({ isPending, optimisticFavorite, handleToggle })}</>;
};

export default FavorBoardButton;

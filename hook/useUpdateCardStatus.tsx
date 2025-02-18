"use client";

import { completeCard } from "@/aciotns/card/completeCard";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";

export const useUpdateCardStatus = () => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const updateStatus = (cardId: string, cardData: any, newStatus: boolean) => {
    // 樂觀更新：直接更新 query 的數據快取
    queryClient.setQueryData(["card", cardId], {
      ...cardData,
      completed: newStatus,
    });

    startTransition(async () => {
      try {
        await completeCard(cardId, newStatus);
        queryClient.invalidateQueries({ queryKey: ["card", cardId] });
      } catch (error) {
        console.error("更新狀態失敗", error);
        queryClient.setQueryData(["card", cardId], {
          ...cardData,
          completed: !newStatus,
        });
      }
    });
  };

  return { updateStatus, isPending };
};

"use client";

import { completeCard } from "@/aciotns/card/completeCard";
import Tip from "@/components/Tip";
import { useCardModal } from "@/hook/useCardModal";
import { useUpdateCardStatus } from "@/hook/useUpdateCardStatus";
import { fetcher } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Circle, CircleCheck, Text } from "lucide-react";
import { useTransition } from "react";

interface CardItemProps {
  card: Card;
  index: number;
}

const CardItem = ({ card, index }: CardItemProps) => {
  const cardModal = useCardModal();
  const { updateStatus, isPending } = useUpdateCardStatus();

  // 透過 useQuery 從快取中取得最新的卡片數據
  const { data: cardData } = useQuery({
    queryKey: ["card", card.id],
    queryFn: () => fetcher(`/api/cards/${card.id}`),
    initialData: card,
  });

  const handleToggleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newStatus = !cardData.completed;
    updateStatus(card.id, cardData, newStatus);
  };
  
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(card.id)}
          className="group truncate py-2 px-3 text-sm border-2 border-transparent hover:border-aligno-300 bg-aligno-600 rounded-md shadow-md transition duration-500"
        >
          <div className="flex items-center relative">
            <button
              onClick={handleToggleComplete}
              disabled={isPending}
              className={cn(
                "absolute left-0 top-1/2 transform -translate-y-1/2  transition-opacity duration-200",
                cardData.completed
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              )}
            >
              {cardData.completed ? (
                <CircleCheck className="w-4 h-4 fill-green-500 text-aligno-400 " />
              ) : (
                <Circle className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <span
              className={`transition-all duration-500  ${
                cardData.completed ? "px-6" : "group-hover:translate-x-6"
              }`}
            >
              {card.title}
            </span>
          </div>
          {card.description && (
            <div className="mt-2">
              <Tip description="此看板有敘述內容" sidOffset={5}>
                <Text className="h-4 w-4" />
              </Tip>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;

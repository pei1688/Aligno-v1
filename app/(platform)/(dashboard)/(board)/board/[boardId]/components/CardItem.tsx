"use client";

import Tip from "@/components/Tip";
import { useCardModal } from "@/hook/useCardModal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import { Text } from "lucide-react";

interface CardItemProps {
  card: Card;
  index: number;
}

const CardItem = ({ card, index }: CardItemProps) => {
  const cardModal = useCardModal();

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
          <span>{card.title}</span>
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

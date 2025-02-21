"use client";

import { useUpdateCardStatus } from "@/hook/useUpdateCardStatus";
import { Card } from "@prisma/client";
import { Circle, CircleCheck, Loader2 } from "lucide-react";
import { useOptimistic, useTransition } from "react";

interface HeaderProps {
  card: Card
}

const CheckCard = ({ card }: HeaderProps) => {
  const { updateStatus } = useUpdateCardStatus();
  const [isPending, startTransition] = useTransition();
  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
    card?.completed
  );

  const toggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!card) return;
    const newStatus = !optimisticCompleted;
    startTransition(async () => {
      setOptimisticCompleted(newStatus);
    });
    updateStatus(card.id, card, newStatus);
  };

  return (
    <button onClick={toggleComplete} disabled={isPending}>
      {isPending ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : card?.completed ? (
        <CircleCheck className="h-6 w-6 text-green-500" />
      ) : (
        <Circle className="h-6 w-6 text-gray-400" />
      )}
    </button>
  );
};

export default CheckCard;

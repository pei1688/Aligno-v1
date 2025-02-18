"use client";

import { ListWithCards } from "@/lib/types";
import ListHeader from "./ListHeader";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./CardForm";
import { cn } from "@/lib/utils";
import CardItem from "./CardItem";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface ListItemProps {
  list: ListWithCards;
  index: number;
}

const ListItem = ({ list, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="w-[272px] shrink-0 h-full select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-aligno-800 p-2"
          >
            <ListHeader list={list} onAddCard={enableEditing} />
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    list.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {list.cards.map((card, index) => (
                    <CardItem card={card} index={index} key={card.id} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={list.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;

"use client";

import { ListWithCards } from "@/lib/types";
import ListForm from "./ListForm";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { updateListOrder } from "@/aciotns/updateListOrder";
import { updateCardOrder } from "@/aciotns/updateCardOrder";

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}
//list: T[] → 原始陣列，可以是任何類型的陣列元素 (如 string[]、
function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  //建立原陣列的副本 (Array.from(list))
  const result = Array.from(list);
  //splice(startIndex, 1) 會刪除索引 startIndex 的元素，並回傳刪除的項目。
  const [removed] = result.splice(startIndex, 1);
  //將 removed 插入 endIndex 位置
  result.splice(endIndex, 0, removed);
  return result;
}

const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  const [orderLists, setOrderLists] = useState(lists);

  useEffect(() => {
    setOrderLists(lists);
  }, [lists]);

  const onDragEnd = async (result: any) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    //托拽到同一個位置，就不做任何動作
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //🔸移動列表
    if (type === "list") {
      //將對應數據傳入reorder函式中來處理排序，排序更新後將其遍歷出來更新index
      const items = reorder(orderLists, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderLists(items);
      //觸發伺服器操作
      const formData = new FormData();
      formData.append("boardId", boardId);
      formData.append("items", JSON.stringify(items));
      const response = await updateListOrder(formData);
      if (response.error) {
        console.error(response.error);
      }
    }

    //🔸移動卡片
    if (type === "card") {
      let newOrderedLists = [...orderLists];
      //源拖曳的卡片所屬的清單
      const sourceList = newOrderedLists.find(
        (list) => list.id === source.droppableId
      );
      //拖曳後的卡片所屬的清單
      const destList = newOrderedLists.find(
        (list) => list.id === destination.droppableId
      );
      if (!sourceList || !destList) {
        return;
      }

      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      if (!destList.cards) {
        destList.cards = [];
      }
      //🔸如果是同一清單內移動
      if (source.droppableId === destination.droppableId) {
        // 重新排序
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        //reorderedCards 陣列，並根據新的索引 (index) 更新 order 屬性。 這邊使用forEach是因為有使用淺拷貝
        reorderedCards.forEach((card, index) => {
          card.order = index;
        });
        sourceList.cards = reorderedCards;
        setOrderLists(newOrderedLists);
        //觸發伺服器操作
        const formData = new FormData();
        formData.append("boardId", boardId);
        formData.append("items", JSON.stringify(destList.cards));
        const response = await updateCardOrder(formData);
        if (response.error) {
          console.error(response.error);
        }
      } else {
        //🔸把卡片移動到其他列表
        const fromListName = sourceList.title;
        const toListName = destList.title;
        //先把移動的卡片從所屬源列表刪除
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        //將新的 listId 分配給移動的卡片
        movedCard.listId = destination.droppableId;
        //將移動的卡片移入目標列表
        destList.cards.splice(destination.index, 0, movedCard);
        //更新源列表的index
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        //更新目標清單中每張卡片的順序
        destList.cards.forEach((card, index) => {
          card.order = index;
        });
        //更新數據
        setOrderLists(newOrderedLists);
        //觸發伺服器操作
        const formData = new FormData();
        formData.append("boardId", boardId);
        formData.append("items", JSON.stringify(destList.cards));
        formData.append("fromListId", sourceList.id); // 傳遞來源列表 ID
        formData.append("toListId", destList.id); // 傳遞目標列表 ID
        formData.append("fromListName", fromListName); // 傳遞來源列表名稱
        formData.append("toListName", toListName); // 傳遞目標列表名稱
        const response = await updateCardOrder(formData);
        if (response.error) {
          console.error(response.error);
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-4"
          >
            {orderLists.map((list, index) => {
              return <ListItem key={list.id} list={list} index={index} />;
            })}
            {provided.placeholder}

            <ListForm />

            <div className="flex shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;

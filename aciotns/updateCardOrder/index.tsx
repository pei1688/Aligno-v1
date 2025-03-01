"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateCardOrderSchema } from "./schema";
import { createActivityLog } from "@/lib/createActivityLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export async function updateCardOrder(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }

  // 從 formData 取得數據
  const itemsString = formData.get("items") as string;
  const boardId = formData.get("boardId") as string;
  const fromListName = formData.get("fromListName") as string;
  const toListName = formData.get("toListName") as string;

  if (!itemsString || !boardId || !fromListName || !toListName) {
    return { error: "缺少必要欄位" };
  }

  const items = JSON.parse(itemsString); // 解析 JSON

  // 驗證數據格式
  const parsedData = UpdateCardOrderSchema.safeParse({ items, boardId });
  if (!parsedData.success) {
    console.error("驗證失敗:", parsedData.error.format());
    return { error: "欄位格式錯誤" };
  }

  try {
    // 取得 board 資訊
    const board = await db.board.findUnique({
      where: { id: boardId },
      select: { workspaceId: true },
    });

    if (!board) {
      return { error: "找不到對應的看板" };
    }

    const workspaceId = board.workspaceId; // 確保 workspaceId 存在

    // 執行批量更新
    const transaction = items.map((card: any) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              workspaceId: board.workspaceId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    // db.$transaction() 讓所有更新作為原子操作執行
    const updatedCards = await db.$transaction(transaction);

    // 🔹 紀錄移動活動日誌
    await Promise.all(
      items.map((card: any) =>
        createActivityLog({
          entityId: card.id,
          boardId,
          entityType: ENTITY_TYPE.CARD,
          entityTitle: card.title,
          action: ACTION.MOVE,
          workspaceId,
          fromListName, // 傳遞來源列表名稱
          toListName, // 傳遞目標列表名稱
        })
      )
    );

    // 重新驗證快取
    revalidatePath(`/board/${boardId}`);

    return { data: updatedCards };
  } catch (error) {
    console.error("更新列表過程中發生錯誤:", error);
    return { error: "更新列表失敗" };
  }
}

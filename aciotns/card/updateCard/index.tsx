"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateCardSchema } from "./schema";
import { createActivityLog } from "@/lib/createActivityLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export const updateCard = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }
  const title = formData.get("title") as string;
  const boardId = formData.get("boardId") as string;
  const description = formData.get("description") as string;
  const id = formData.get("id") as string;
  // 將空字符串轉為 undefined
  const parsedTitle = title || undefined;
  const parsedDescription = description || undefined;
  const parsedData = UpdateCardSchema.safeParse({
    boardId,
    id,
    title: parsedTitle,
    description: parsedDescription,
  });
  if (!parsedData.success) {
    return { error: "欄位格式錯誤" };
  }
  const values = parsedData.data;
  try {
    const card = await db.card.update({
      where: {
        id,
      },
      include: {
        list: { include: { board: { select: { workspaceId: true } } } },
      },
      data: {
        ...values,
      },
    });
    const workspaceId = card.list.board.workspaceId;
    await createActivityLog({
      entityId: card.id,
      boardId,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
      action: ACTION.UPDATE,
      workspaceId,
    });
    revalidatePath(`/board/${boardId}`);
    return { data: card };
  } catch (error) {
    console.error("更新卡片過程中發生錯誤:", error);
    return { error: "更新卡片時發生錯誤" };
  }
};

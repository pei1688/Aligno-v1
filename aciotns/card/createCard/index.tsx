"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateCardSchema } from "./schema";
import { createActivityLog } from "@/lib/createActivityLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export const createCard = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }
  const title = formData.get("title") as string;
  const boardId = formData.get("boardId") as string;
  const listId = formData.get("listId") as string;

  const parsedData = CreateCardSchema.safeParse({ title, boardId, listId });
  if (!parsedData.success) {
    return { error: "欄位格式錯誤" };
  }

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
      },
      include: {
        board: { select: { workspaceId: true } },
      },
    });
    const workspaceId = list?.board.workspaceId;
    if (!list || !workspaceId) {
      return { error: "列表不存在" };
    }
    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = lastCard ? lastCard.order + 1 : 1;
    const card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });

    await createActivityLog({
      entityId: card.id,
      boardId,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
      action: ACTION.CREATE,
      workspaceId,
    });

    revalidatePath(`/board/${boardId}`);
    return { data: card };
  } catch (error) {
    console.error("建立列表過程中發生錯誤:", error);
    return { error: "建立列表時發生錯誤" };
  }
};

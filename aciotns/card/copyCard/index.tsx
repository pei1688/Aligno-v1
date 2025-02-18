"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteOrCopyCardSchema } from "../GeneralSchema/DeleteOrCopy-CardSchema";
import { createActivityLog } from "@/lib/createActivityLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export const copyCard = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }
  const id = formData.get("id") as string;
  const boardId = formData.get("boardId") as string;
  const parsedData = DeleteOrCopyCardSchema.safeParse({ id, boardId });
  if (!parsedData.success) {
    return { error: "id錯誤" };
  }

  try {
    const cardCopy = await db.card.findUnique({
      where: {
        id,
      },
      include: {
        list: {
          include: {
            board: { select: { workspaceId: true } },
          },
        },
      },
    });
    const workspaceId = cardCopy?.list.board.workspaceId;
    if (!cardCopy || !workspaceId) {
      return { error: "找不到對應列表" };
    }
    const lastCard = await db.card.findFirst({
      where: {
        listId: cardCopy.listId,
      },
      orderBy: {
        order: "desc",
      },
      select: { order: true },
    });
    const newCard = lastCard ? lastCard.order + 1 : 1;
    const card = await db.card.create({
      data: {
        title: `${cardCopy.title}-copy`,
        description: cardCopy.description,
        order: newCard,
        listId: cardCopy.listId,
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
    console.error("複製 List 時發生錯誤:", error);
    return { error: "複製過程中出現錯誤" };
  }
};

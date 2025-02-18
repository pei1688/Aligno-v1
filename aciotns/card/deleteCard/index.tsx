"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteOrCopyCardSchema } from "../GeneralSchema/DeleteOrCopy-CardSchema";
import { createActivityLog } from "@/lib/createActivityLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export const deleteCard = async (formData: FormData) => {
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
    const board = await db.board.findUnique({
      where: { id: boardId },
      select: { workspaceId: true },
    });
    const workspaceId = board?.workspaceId;
    if (!board || !workspaceId) {
      return { error: "找不到對應的看板" };
    }
    const card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            workspaceId,
          },
        },
      },
    });

    await createActivityLog({
      entityId: card.id,
      boardId,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
      action: ACTION.DELETE,
      workspaceId,
    });

    revalidatePath(`/board/${boardId}`);
    return { data: card };
  } catch (error) {
    console.error("刪除 Card 時發生錯誤:", error);
    return { error: "刪除過程中出現錯誤" };
  }
};

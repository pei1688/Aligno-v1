"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteOrCopyListSchema } from "../GeneralSchema/DeleteOrCopy-ListSchema";
import { createActivityLog } from "@/lib/createActivityLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export const copyList = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }
  const id = formData.get("id") as string;
  const boardId = formData.get("boardId") as string;
  const parsedData = DeleteOrCopyListSchema.safeParse({ id, boardId });
  if (!parsedData.success) {
    return { error: "id錯誤" };
  }

  try {
    const listCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
      },
      include: { cards: true, board: { select: { workspaceId: true } } },
    });
    const workspaceId = listCopy?.board.workspaceId;
    if (!listCopy || !workspaceId) {
      return { error: "找不到對應列表" };
    }
    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: { order: true },
    });
    const newList = lastList ? lastList.order + 1 : 1;
    const list = await db.list.create({
      data: {
        title: `${listCopy.title}-copy`,
        boardId: listCopy.boardId,
        order: newList,
        cards: {
          //createMany 一次性新增所有 cards，比 forEach + create 更快
          createMany: {
            data: listCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });

    await createActivityLog({
      entityId: list.id,
      boardId,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: list.title,
      action: ACTION.CREATE,
      workspaceId,
    });
    revalidatePath(`/board/${boardId}`);
    return { data: list };
  } catch (error) {
    console.error("複製 List 時發生錯誤:", error);
    return { error: "複製過程中出現錯誤" };
  }
};

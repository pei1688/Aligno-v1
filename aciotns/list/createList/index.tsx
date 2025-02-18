"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CreateListSchema } from "./schema";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createActivityLog } from "@/lib/createActivityLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export const createList = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }
  console.log(formData);

  const title = formData.get("title") as string;
  const boardId = formData.get("boardId") as string;

  const parsedData = CreateListSchema.safeParse({ title, boardId });
  if (!parsedData.success) {
    return { error: "欄位格式錯誤" };
  }

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
      },
      select: { workspaceId: true },
    });
    const workspaceId = board?.workspaceId;
    if (!board || !workspaceId) {
      return { error: "對應看板不存在" };
    }
    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });
    const newOrder = lastList ? lastList.order + 1 : 1;
    const list = await db.list.create({
      data: { title, boardId, order: newOrder },
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
    console.error("建立列表過程中發生錯誤:", error);
    return { error: "建立列表時發生錯誤" };
  }
};

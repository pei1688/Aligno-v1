"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteOrCopyListSchema } from "../GeneralSchema/DeleteOrCopy-ListSchema";
import { createActivityLog } from "@/lib/createActivityLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export const deleteList = async (formData: FormData) => {
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
    const board = await db.board.findUnique({
      where: { id: parsedData.data.boardId },
      select: { workspaceId: true }, // 只取 workspaceId
    });
    const workspaceId = board?.workspaceId;
    if (!board || !workspaceId) {
      return { error: "對應看板不存在" };
    }
    const list = await db.list.delete({
      where: {
        id: parsedData.data.id,
        boardId: parsedData.data.boardId,
        board: {
          workspaceId,
        },
      },
    });

    await createActivityLog({
      entityId: list.id,
      boardId,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: list.title,
      action: ACTION.DELETE,
      workspaceId,
    });
    revalidatePath(`/board/${boardId}`);
    return { data: list };
  } catch (error) {
    console.error("刪除 List 時發生錯誤:", error);
    return { error: "刪除過程中出現錯誤" };
  }
};

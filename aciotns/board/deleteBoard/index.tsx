"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { DeleteBoard } from "./schema";
import { createActivityLog } from "@/lib/createActivityLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decreaseAvailableCount } from "@/lib/workspaceLimit";
import { subscription } from "@/lib/subscription";

export const deleteBoard = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }
  const id = formData.get("id") as string;
  const parsedData = DeleteBoard.safeParse({ id });
  if (!parsedData.success) {
    return { error: "id錯誤" };
  }

  try {
    const board = await db.board.findUnique({
      where: { id: parsedData.data.id },
      select: { workspaceId: true, title: true },
    });
    const workspaceId = board?.workspaceId;
    if (!board || !workspaceId) {
      return { error: "找不到對應的 board" };
    }
    await db.board.delete({
      where: {
        id: parsedData.data.id,
      },
    });
    const isPremium = await subscription(workspaceId);

    if (!isPremium) {
      await decreaseAvailableCount(workspaceId);
    }
    await createActivityLog({
      entityId: parsedData.data.id,
      boardId: id,
      entityType: ENTITY_TYPE.BOARD,
      entityTitle: board.title,
      action: ACTION.DELETE,
      workspaceId,
    });

    revalidatePath(`/workspace/${board?.workspaceId}`);
    return { success: true };
  } catch (error) {
    console.error("刪除 Board 時發生錯誤:", error);
    return { error: "刪除過程中出現錯誤" };
  }
};

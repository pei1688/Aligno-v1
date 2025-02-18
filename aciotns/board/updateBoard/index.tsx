"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateBoardSchema } from "./schema";
import { createActivityLog } from "@/lib/createActivityLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export const updateBoard = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }
  const title = formData.get("title");
  const id = formData.get("id") as string;

  const parsedData = UpdateBoardSchema.safeParse({ title, id });
  if (!parsedData.success) {
    return { error: "欄位格式錯誤" };
  }
  try {
    const updateBoard = await db.board.update({
      where: {
        id: parsedData.data.id,
      },
      select: { workspaceId: true },
      data: { title: parsedData.data.title },
    });

    await createActivityLog({
      entityId: parsedData.data.id,
      boardId: id,
      entityType: ENTITY_TYPE.BOARD,
      entityTitle: parsedData.data.title,
      action: ACTION.UPDATE,
      workspaceId: updateBoard.workspaceId,
    });
    revalidatePath(`/board/${id}`);
    return { data: updateBoard };
  } catch (error) {
    console.error("更新看板過程中發生錯誤:", error);
    return { error: "更新看板時發生錯誤" };
  }
};

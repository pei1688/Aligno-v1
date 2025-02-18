"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateListSchema } from "./schema";
import { createActivityLog } from "@/lib/createActivityLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export async function update(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }

  const title = formData.get("title") as string;
  const id = formData.get("id") as string;
  const boardId = formData.get("boardId") as string;

  const parsedData = UpdateListSchema.safeParse({ title, id, boardId });
  if (!parsedData.success) {
    return { error: "欄位格式錯誤" };
  }

  try {
    const updateList = await db.list.update({
      where: {
        id: parsedData.data.id,
        boardId: parsedData.data.boardId,
      },
      include: { board: { select: { workspaceId: true } } },
      data: { title: parsedData.data.title },
    });
    await createActivityLog({
      entityId: parsedData.data.id,
      boardId,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: parsedData.data.title,
      action: ACTION.UPDATE,
      workspaceId: updateList.board.workspaceId,
    });
    revalidatePath(`/board/${id}`);
    return { data: updateList };
  } catch (error) {
    console.error("❌更新列表過程中發生錯誤:", error);
    return { error: "更新列表失敗" };
  }
}

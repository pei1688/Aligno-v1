"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";

import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { CreateBoardSchema } from "./schema";
import { createActivityLog } from "@/lib/createActivityLog";
import {
  hasAvailableCount,
  incrementAvailableCount,
} from "@/lib/workspaceLimit";
import { subscription } from "@/lib/subscription";

export async function createBoard(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }

  const title = formData.get("title");
  const image = formData.get("image");
  const workspaceId = formData.get("workspaceId") as string;

  const parsedData = CreateBoardSchema.safeParse({ title, image, workspaceId });
  if (!parsedData.success) {
    return { error: "欄位格式錯誤" };
  }
  const { title: validatedTitle, image: validatedImage } = parsedData.data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    validatedImage.split("|");
  const canCreate = await hasAvailableCount(workspaceId);
  const isPremium = await subscription(workspaceId);
  if (!canCreate && !isPremium) {
    return { error: "已達免費面板最大上限，請升級會員" };
  }
  try {
    const board = await db.board.create({
      data: {
        title: validatedTitle,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
        workspace: {
          connect: { id: workspaceId },
        },
      },
    });
    //是會員就不增加
    if (!isPremium) {
      await incrementAvailableCount(workspaceId);
    }

    await createActivityLog({
      entityId: board.id,
      boardId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      entityTitle: board.title,
      action: ACTION.CREATE,
      workspaceId,
    });

    revalidatePath(`/workspace/${workspaceId}`);
    return { data: board };
  } catch (error) {
    console.error("❌看板建立錯誤:", error);
    return { error: "看板建立失敗" };
  }
}

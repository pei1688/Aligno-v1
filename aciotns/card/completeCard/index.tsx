"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CompleteCardSchema } from "./schema";

export const completeCard = async (cardId: string, completed: boolean) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }

  const parsedData = CompleteCardSchema.safeParse({
    cardId,
    completed,
  });
  if (!parsedData.success) {
    return { error: "欄位格式錯誤" };
  }
  try {
    const card = await db.card.update({
      where: {
        id: cardId,
      },
      include: { list: { select: { boardId: true } } },
      data: {
        completed,
      },
    });
    revalidatePath(`/board/${card.list.boardId}`);
    return { data: card };
  } catch (error) {
    console.error("更新卡片過程中發生錯誤:", error);
    return { error: "更新卡片時發生錯誤" };
  }
};

"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const toggleFavorite = async (
  boardId: string
  //回傳處理
): Promise<{ data?: boolean; error?: string }> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }

  try {
    const board = await db.board.findUnique({ where: { id: boardId } });
    if (!board) return { error: "看板不存在" };
    const updateFavorite = await db.board.update({
      where: {
        id: boardId,
      },
      data: { isFavorites: !board.isFavorites },
    });
    revalidatePath(`/board/${boardId}`);
    return { data: updateFavorite.isFavorites };
  } catch (error) {
    console.error("移除收藏過程中發生錯誤:", error);
    return { error: "移除收藏時發生錯誤" };
  }
};

"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateListOrderSchema } from "./schema";

export async function updateListOrder(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }

  const itemsString = formData.get("items") as string;
  const boardId = formData.get("boardId") as string;

  if (!itemsString || !boardId) {
    return { error: "缺少必要欄位" };
  }

  const items = JSON.parse(itemsString);
  //驗證數據格式
  const parsedData = UpdateListOrderSchema.safeParse({ items, boardId });
  if (!parsedData.success) {
    console.error("驗證失敗:", parsedData.error.format());
    return { error: "欄位格式錯誤" };
  }

  try {
    // 執行批次更新
    const transaction = items.map((list: any) =>
      db.list.update({
        where: { id: list.id },
        data: {
          order: list.order,
        },
      })
    );

    const updateLists = await db.$transaction(transaction);
    revalidatePath(`/board/${boardId}`);
    return { data: updateLists };
  } catch (error) {
    console.error("更新列表過程中發生錯誤:", error);
    return { error: "更新列表失敗" };
  }
}

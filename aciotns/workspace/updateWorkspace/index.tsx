"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UpdateWorkspaceSchema } from "./schema";

export const updateWorkspace = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }
  //驗證
  const title = formData.get("title") as string;
  const workspaceId = formData.get("workspaceId") as string;
  const description = formData.get("description") as string;
  const parsedTitle = title || undefined;
  const parsedDescription = description || undefined;
  const parsedData = UpdateWorkspaceSchema.safeParse({
    workspaceId,
    title: parsedTitle,
    description: parsedDescription,
  });
  if (!parsedData.success) {
    return { error: "欄位格式錯誤" };
  }
  try {
    const workspace = await db.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        title,
        description,
      },
    });
    revalidatePath(`/workspace/${workspaceId}`);
    return { data: workspace };
  } catch (error) {
    console.error("更新工作區過程中發生錯誤:", error);
    return { error: "更新工作區時發生錯誤" };
  }
};

"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { DeleteWorkspaceListSchema } from "./DeleteWorkspaceSchema";
import { revalidatePath } from "next/cache";

export const deleteWorkspace = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }

  const workspaceId = formData.get("workspaceId") as string;
  const parsedData = DeleteWorkspaceListSchema.safeParse({ workspaceId });
  if (!parsedData.success) {
    return { error: "id錯誤" };
  }
  try {
    await db.activityLog.deleteMany({
      where: {
        workspaceId: workspaceId,
      },
    });
    const workspace = await db.workspace.delete({
      where: {
        id: workspaceId,
      },
    });
    revalidatePath("/");
    return { data: workspace };
  } catch (error) {
    console.error("刪除工作區時發生錯誤:", error);
    return { error: "刪除過程中出現錯誤" };
  }
};

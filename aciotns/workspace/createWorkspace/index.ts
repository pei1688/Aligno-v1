"use server";

import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CreateWorkspaceSchema } from "./schema";
import { revalidatePath } from "next/cache";

export async function createWorkspace({ title }: { title: string }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("尚未登入");
  }

  const parsedData = CreateWorkspaceSchema.safeParse({ title });

  if (!parsedData.success) {
    throw new Error("欄位格式錯誤");
  }
  try {
    const workspace = await db.workspace.create({
      data: {
        title: parsedData.data.title,
        user: {
          connect: { id: user.id }, 
        },
      },
    });
    revalidatePath("/workspace");
    return { data: workspace };
  } catch (error) {
    console.error("建立工作區過程中發生錯誤:", error);
    return { error: "建立工作區時發生錯誤" };
  }
}

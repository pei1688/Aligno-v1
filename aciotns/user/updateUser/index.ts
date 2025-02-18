"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UpdateUserSchema } from "./schema";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUser(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("尚未登入");
  }
  const lastName = formData.get("lastName") as string;
  const firstName = formData.get("firstName") as string;
  const parsedData = UpdateUserSchema.safeParse({ lastName, firstName });

  if (!parsedData.success) {
    throw new Error("欄位格式錯誤");
  }
  try {
    const updateUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName,
        lastName,
      },
    });
    revalidatePath("/user");
    return { data: updateUser };
  } catch (error) {
    console.error("更新使用者過程中發生錯誤:", error);
    return { error: "更新使用者時發生錯誤" };
  }
}

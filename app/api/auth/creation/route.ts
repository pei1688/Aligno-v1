import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.json({ error: "未找到使用者" }, { status: 401 });
  }

  let dbUser = await db?.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) {
    dbUser = await db?.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
  }

  return NextResponse.redirect(
    new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
  );
}

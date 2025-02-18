import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return new NextResponse("沒有權限", { status: 401 });

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("獲取失敗", { status: 500 });
  }
}

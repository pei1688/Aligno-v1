import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    // 驗證用戶
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return new NextResponse("沒有權限", { status: 401 });

    const { cardId } = params;

    // 透過 `include` 一次取得 Card + WorkspaceId，減少請求數量
    const card = await db.card.findUnique({
      where: { id: cardId },
      include: {
        list: {
          include: {
            board: {
              select: { workspaceId: true },
            },
          },
        },
      },
    });

    if (!card) {
      return new NextResponse("卡片不存在", { status: 404 });
    }

    const workspaceId = card.list?.board?.workspaceId;
    if (!workspaceId) {
      return new NextResponse("找不到 workspaceId", { status: 404 });
    }

    // 取得活動日誌
    const actLogs = await db.activityLog.findMany({
      where: {
        workspaceId,
        entityId: cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(actLogs);
  } catch (error) {
    console.error("獲取卡片活動日誌時發生錯誤:", error);
    return new NextResponse("伺服器錯誤", { status: 500 });
  }
}

import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { workspaceId: string } }
) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return new NextResponse("沒有權限", { status: 401 });

    const workspace = await db.workspace.findUnique({
      where: {
        id: params.workspaceId,
        userId: user.id,
      },
      include: {
        boards: true,
      },
    });

    if (!workspace) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(workspace.boards);
  } catch (error) {
    return new NextResponse("獲取失敗", { status: 500 });
  }
}

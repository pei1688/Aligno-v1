import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ACTION, ENTITY_TYPE, Prisma } from "@prisma/client";
import db from "./db";

interface Acprops {
  workspaceId: string;
  boardId: string;
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
  fromListId?: string; // 修正：新增 `fromListId`
  toListId?: string; // 修正：新增 `toListId`
  fromListName?: string;
  toListName?: string;
}

export const createActivityLog = async (props: Acprops) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return;
  }
  const {
    workspaceId,
    boardId,
    entityId,
    entityTitle,
    entityType,
    action,
    fromListId,
    toListId,
    fromListName,
    toListName,
  } = props;


  await db.activityLog.create({
    data: {
      boardId,
      workspaceId,
      action,
      entityId,
      entityType,
      entityTitle,
      fromListId,
      toListId,
      fromListName,
      toListName,
      userId: user.id,
      userImage: user.picture ?? "",
      userName: user.given_name ?? "未知使用者",
    },
  });

  try {
  } catch (error) {
    console.log("[ACTY_LOG_錯誤]", error);
  }
};

import { MAX_FREE_BOARDS } from "@/constants/board";
import db from "./db";
//增加可用數量
export const incrementAvailableCount = async (workspaceId: string) => {
  if (!workspaceId) {
    throw new Error("找不到工作區");
  }

  const workspaceLimit = await db.workspaceLimit.findUnique({
    where: {
      workspaceId,
    },
  });

  if (workspaceLimit) {
    await db.workspaceLimit.update({
      where: {
        workspaceId,
      },
      data: {
        count: workspaceLimit.count + 1,
      },
    });
  } else {
    await db.workspaceLimit.create({
      data: {
        workspaceId,
        count: 1,
      },
    });
  }
};

//減少可用數量
export const decreaseAvailableCount = async (workspaceId: string) => {
  if (!workspaceId) {
    throw new Error("找不到工作區");
  }
  const workspaceLimit = await db.workspaceLimit.findUnique({
    where: {
      workspaceId,
    },
  });

  if (workspaceLimit) {
    await db.workspaceLimit.update({
      where: {
        workspaceId,
      },
      data: {
        count: workspaceLimit.count > 0 ? workspaceLimit.count - 1 : 0,
      },
    });
  } else {
    await db.workspaceLimit.create({
      data: {
        workspaceId,
        count: 1,
      },
    });
  }
};

//可用數量
export const hasAvailableCount = async (workspaceId: string) => {
  if (!workspaceId) {
    throw new Error("找不到工作區");
  }
  const workspaceLimit = await db.workspaceLimit.findUnique({
    where: {
      workspaceId,
    },
  });

  return !workspaceLimit || workspaceLimit.count < MAX_FREE_BOARDS;
};

//獲取可用數量
export const getAvailableCount = async (workspaceId: string) => {
  if (!workspaceId) {
    return 0;
  }

  const workspaceLimit = await db.workspaceLimit.findUnique({
    where: {
      workspaceId,
    },
  });
  return workspaceLimit ? workspaceLimit.count : 0;
};

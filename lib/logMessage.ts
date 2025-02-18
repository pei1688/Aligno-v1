import { ACTION, ActivityLog } from "@prisma/client";

export const logMessage = (log: ActivityLog) => {
  const { entityTitle, entityType, action, fromListName, toListName } = log;

  switch (action) {
    case ACTION.CREATE:
      return ` 建立 ${entityType.toLocaleLowerCase()} "${entityTitle}".`;
    case ACTION.UPDATE:
      return ` 更新 ${entityType.toLocaleLowerCase()} "${entityTitle}".`;
    case ACTION.DELETE:
      return ` 刪除 ${entityType.toLocaleLowerCase()} "${entityTitle}".`;
    case ACTION.MOVE:
      return `移動 ${entityType.toLocaleLowerCase()} "${entityTitle}" 從 「${fromListName}」 到 「${toListName}」.`;
    default:
      return ` 未知動作 ${entityType.toLocaleLowerCase()} "${entityTitle}."`;
  }
};

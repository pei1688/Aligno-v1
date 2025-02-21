import db from "./db";

const DAY_IN_MS = 86_400_000;

export const subscription = async (workspaceId: string) => {
  
  if (!workspaceId) {
    return false;
  }

  const wsSubscription = await db.workspaceSub.findUnique({
    where: {
      workspaceId,
    },
    select: {
      stripeSubscriptionId: true, // Stripe 訂閱的 ID
      stripeCurrentPeriodEnd: true, // 訂閱的結束時間
      stripeCustomerId: true, // Stripe 客戶 ID
      stripePriceId: true, // 訂閱方案的價格 ID
    },
  });
  if (!wsSubscription) {
    return false;
  }
  // 檢查 stripePriceId 是否存在（確保有訂閱方案）。
  // 確認訂閱是否仍然有效（stripeCurrentPeriodEnd + 1 天 > 現在時間）。
  const isValid =
    wsSubscription.stripePriceId &&
    wsSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};

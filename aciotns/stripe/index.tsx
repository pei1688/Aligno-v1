"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

export const StripeRedirect = async (workspaceId: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return { error: "尚未登入" };
  }
  const settingUrl = absoluteUrl(`/workspace/${workspaceId}`);
  let url = "";
  try {
    const wsSubscription = await db.workspaceSub.findUnique({
      where: {
        workspaceId,
      },
    });

    if (wsSubscription && wsSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: wsSubscription.stripeCustomerId,
        return_url: settingUrl,
      });

      url = stripeSession.url;
    } else {
      const stripSession = await stripe.checkout.sessions.create({
        success_url: settingUrl,
        cancel_url: settingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.email as string,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Aligno Premium",
                description: "為您的工作空間提供無限的圖板",
              },
              unit_amount: 1500,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          workspaceId,
        },
      });

      url = stripSession.url || "";
    }
  } catch (err) {
    console.error("StripeRedirect Error:", err); // 添加詳細日誌
    return {
      error: "訂單處理失敗，請稍後再試", // 更明確的錯誤訊息
    };
  }
  revalidatePath(`/workspace/${workspaceId}`);
  return { data: url };
};

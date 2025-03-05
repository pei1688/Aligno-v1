"use client";

import { usePremiumModal } from "@/hook/usePremiumModal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { StripeRedirect } from "@/aciotns/stripe";

const PremiumModal = () => {
  const preModal = usePremiumModal();
  const [isPending, startTransition] = useTransition();

  const handleUpgrade = () => {
    if (!preModal.workspaceId) {
      toast.error("缺少工作區資訊");
      return;
    }
    startTransition(async () => {
      const res = await StripeRedirect(preModal.workspaceId as string);

      if (res?.error) {
        toast.error(res.error);
      }

      if (res?.data) {
        window.location.href = res.data; // 執行 Stripe 重定向
      }
    });
  };

  return (
    <Dialog open={preModal.isOpen} onOpenChange={preModal.onClose}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-center">
          <Image src={"/img/sub.jpg"} alt="sub" className="object-cover" fill />
        </div>
        <div className="mx-auto space-y-6 p-6 text-aligno-200">
          <h2 className="text-xl font-semibold">升級至Aligno Premium!</h2>
          <p className="text-xs font-semibold">探索 Aligno 的精彩之處</p>
          <div className="pl-3">
            <ul className="list-disc text-sm">
              <li>無限制的看板</li>
              <li>進階清單</li>
              <li>管理和安全功能</li>
              <li>還有更多!</li>
            </ul>
          </div>
          <Button
            onClick={handleUpgrade}
            className="w-full justify-center bg-aligno-500"
            variant="transparent"
            disabled={isPending}
          >
            立即升級
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;

"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCardModal } from "@/hook/useCardModal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import Description from "./Description";
import { Action } from "./Action";
import Activity from "./Activity";
import Spinner from "@/components/Spinner";

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: CardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
    enabled: !!id, //將 id 轉換為布林值 enabled轉為true才進行fetch
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden">更新卡片</DialogTitle>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        {!CardData ? (
          <div className="flex justify-center items-center min-h-40">
            <Spinner />
          </div>
        ) : (
          <>
            <Header card={CardData} />
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
              <div className="col-span-3">
                <div className="w-full space-y-8">
                  <Description card={CardData} />
                  <Activity id={id!} />
                </div>
              </div>
              <Action card={CardData} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;

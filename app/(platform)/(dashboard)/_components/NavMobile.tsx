"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

const NavMobile = () => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [favoriteOpen, setFavoriteOpen] = useState(false);
  return (
    <>
      <Popover open={moreOpen} onOpenChange={setMoreOpen}>
        <PopoverTrigger
          className="px-4 py-1 font-semibold text-sm hover:bg-aligno-600/50 rounded-sm transition flex items-center gap-1"
          onClick={() => setMoreOpen(!moreOpen)}
        >
          更多
          <span>
            <ChevronDown className="size-4" />
          </span>
        </PopoverTrigger>
        <PopoverContent>
          <div
            className="cursor-pointer p-2 hover:bg-gray-100"
            onClick={() => {
              setMoreOpen(false); // 關閉「更多」Popover
              setFavoriteOpen(true); // 打開 NavFavoriteItem Popover
            }}
          >
            最愛收藏
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NavMobile;

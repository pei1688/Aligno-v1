"use client";

import { toggleFavorite } from "@/aciotns/board/toggleFavorite";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

interface SideLinkProps {
  href: string;
  icon?: LucideIcon;
  imageSrc?: string;
  label: string;
  isFavorite?: boolean;
  path: string;
  id?: string;
}

const SideLink = ({
  id,
  href,
  icon: Icon,
  imageSrc,
  label,
  path,
  isFavorite,
}: SideLinkProps) => {
  const pathName = usePathname();

  const isActive =
    pathName === href ||
    (pathName.startsWith(href) && !pathName.includes(path));
  const [isPending, startTransition] = useTransition();
  const [optimisticFavorite, toggleOptimisticFavorite] = useOptimistic(
    isFavorite,
    (curr, action: boolean) => action
  );
  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 避免點擊時觸發 `Link`
    e.preventDefault(); // 避免導向頁面
    startTransition(async () => {
      toggleOptimisticFavorite(!optimisticFavorite);
      const res = await toggleFavorite(id!);
      if (res.error) {
        toggleOptimisticFavorite(optimisticFavorite!);
        toast.error(res.error);
        return;
      }
    });
  };
  const shouldShowStar = isFavorite !== undefined;
  return (
    <Link href={href} className="w-full">
      <Button
        variant="work"
        className={cn(
          "w-full flex items-center ",
          isActive && "bg-zinc-600/50 text-white" // 高亮效果
        )}
      >
        {imageSrc ? (
          <div className="h-4 w-8 relative">
            <Image
              src={imageSrc}
              alt={label}
              fill
              className="rounded-sm object-cover"
            />
          </div>
        ) : Icon ? (
          <Icon className="h-5 w-5" />
        ) : null}
        {label}
        {shouldShowStar && (
          <div
            onClick={handleToggleFavorite}
            className="ml-auto cursor-pointer"
          >
            <Star
              className={`h-5 w-5 transition text-aligno-400  ${
                optimisticFavorite
                  ? "fill-aligno-300 text-aligno-400"
                  : "hover:fill-aligno-400"
              }`}
            />
          </div>
        )}
      </Button>
    </Link>
  );
};

export default SideLink;

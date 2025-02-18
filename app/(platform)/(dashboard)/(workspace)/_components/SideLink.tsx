"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

interface SideLinkProps {
  href: string;
  icon?: LucideIcon;
  imageSrc?: string;
  label: string;
  path: string;
}

const SideLink = ({
  href,
  icon: Icon,
  imageSrc,
  label,
  path,
}: SideLinkProps) => {
  const pathName = usePathname();

  const isActive =
    pathName === href ||
    (pathName.startsWith(href) && !pathName.includes(path));

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
      </Button>
    </Link>
  );
};

export default SideLink;

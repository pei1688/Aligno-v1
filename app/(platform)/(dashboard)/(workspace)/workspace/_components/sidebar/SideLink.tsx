"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideLinkProps {
  href: string;
  icon?: LucideIcon;
  label: string;
  path: string;
}

const SideLink = ({ href, icon: Icon, label, path }: SideLinkProps) => {
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
          isActive && "bg-zinc-600/50 text-white"
        )}
      >
        {Icon && <Icon className="h-5 w-5" />}
        {label}
      </Button>
    </Link>
  );
};

export default SideLink;

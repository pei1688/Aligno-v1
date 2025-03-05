"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortFilter = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="mb-2">
      <Label className="">排序依據</Label>
      <Select onValueChange={handleSortChange} defaultValue="NC-OC">
        <SelectTrigger className="w-[180px] bg-transparent duration-300 focus:ring-2 focus:ring-focusInput">
          <SelectValue placeholder="選擇排序" />
        </SelectTrigger>
        <SelectContent className="border-aligno-500 bg-aligno-600 text-aligno-300 shadow-lg">
          <SelectItem value="NC-OC">依建立時間排序</SelectItem>
          <SelectItem value="A-Z">依字母A-Z排序</SelectItem>
          <SelectItem value="Z-A">依字母Z-A排序</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortFilter;

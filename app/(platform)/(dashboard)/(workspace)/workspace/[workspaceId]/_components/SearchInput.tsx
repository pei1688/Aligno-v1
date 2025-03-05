"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("board") || "",
  );

  useEffect(() => {
    setSearchValue(searchParams.get("board") || "");
  }, [searchParams]);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("board", value);
    } else {
      params.delete("board");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };
  const debounceSearch = useDebounceCallback(handleSearch);

  const clearSearch = () => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("board");
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="mb-2">
      <Label className="">搜尋</Label>
      <div className="relative">
        <Input
          type="text"
          placeholder="搜尋看板"
          className="relative h-[36px] border border-aligno-300 bg-transparent p-2 pl-8 outline-none duration-300 focus:border-focusInput focus:ring-2 focus:ring-focusInput"
          onChange={(e) => {
            setSearchValue(e.target.value); //即時更新
            debounceSearch(e.target.value);
          }}
          value={searchValue}
        />
        <Search className="absolute left-2 top-2.5 h-4 w-4" />
        {searchValue && (
          <X
            className="absolute right-2 top-2.5 h-4 w-4 cursor-pointer"
            onClick={clearSearch}
          />
        )}
      </div>
    </div>
  );
};

export default SearchInput;

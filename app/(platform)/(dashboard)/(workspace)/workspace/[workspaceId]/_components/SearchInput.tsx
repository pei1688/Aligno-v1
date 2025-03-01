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
    searchParams.get("board") || ""
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
          className="p-2 pl-8 h-[36px] bg-transparent relative border border-aligno-300 outline-none focus:border-focusInput focus:ring-2 focus:ring-focusInput duration-300"
          onChange={(e) => {
            setSearchValue(e.target.value); //即時更新
            debounceSearch(e.target.value);
          }}
          value={searchValue}
        />
        <Search className="h-4 w-4 absolute top-2.5 left-2" />
        {searchValue && (
          <X
            className="h-4 w-4 absolute top-2.5 right-2 cursor-pointer"
            onClick={clearSearch}
          />
        )}
      </div>
    </div>
  );
};

export default SearchInput;

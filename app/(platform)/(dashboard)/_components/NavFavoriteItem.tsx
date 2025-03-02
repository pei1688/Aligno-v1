import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Star } from "lucide-react";
import FavorBoardItem from "../(workspace)/workspace/_components/FavorBoardItem";

export interface FavorBoardProps {
  id: string;
  title: string;
  workspace: {
    title: string;
  };
  imageThumbUrl: string;
  isFavorites: boolean;
}

const NavFavoriteItem = async ({
  favorBoards,
}: {
  favorBoards: FavorBoardProps[];
}) => {
  return (
    <Popover>
      <PopoverTrigger className="px-4 py-1 font-semibold text-sm hover:bg-aligno-600/50 rounded-sm transition flex items-center sm:bg-transparent bg-aligno-600">
        <Star className="size-4 mr-1"/>
        <div className="hidden sm:flex sm:mr-1 ">已標上星號</div>
        <ChevronDown className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent align="start" className="px-4 py-3 h-full">
        <div className="flex">
          {favorBoards.length > 0 ? (
            <div className="flex flex-wrap gap-4 w-full ">
              {favorBoards.map((board) => (
                <FavorBoardItem
                  key={board.id}
                  id={board.id}
                  title={board.title}
                  image={board.imageThumbUrl}
                  isFavorite={board.isFavorites}
                  workspace={board.workspace.title}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-aligno-300 px-2">沒有收藏的看板</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavFavoriteItem;

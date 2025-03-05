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
      <PopoverTrigger className="flex items-center rounded-sm bg-aligno-600 px-4 py-1 text-sm font-semibold transition hover:bg-aligno-600/50 sm:bg-transparent">
        <Star className="mr-1 size-4" />
        <div className="hidden sm:mr-1 sm:flex">已標上星號</div>
        <ChevronDown className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent align="start" className="h-full px-4 py-3">
        <div className="flex">
          {favorBoards.length > 0 ? (
            <div className="flex w-full flex-wrap gap-4">
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
            <p className="px-2 text-sm text-aligno-300">沒有收藏的看板</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavFavoriteItem;

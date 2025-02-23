"use client";

import { Board } from "@prisma/client";
import Link from "next/link";
import FavorBoardButton from "@/components/FavorBoardButton";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { Star } from "lucide-react";

interface BoardCardProps {
  workspaceId: string;
}

const BoardCard = ({ workspaceId }: BoardCardProps) => {
  const { data = [] } = useQuery<Board[]>({
    queryKey: ["workspace-board", workspaceId],
    queryFn: () => fetcher(`/api/workspace/${workspaceId}`),
    enabled: !!workspaceId,
  });

  return (
    <>
      {data.length === 0 ? (
        <Spinner />
      ) : (
        data.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-aligno-500 rounded-lg w-full h-[100px] p-2 overflow-hidden shadow-lg"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 transition bg-black/30 group-hover:bg-black/40" />
            <p className="relative font-semibold text-aligno-200">
              {board.title}
            </p>
            <FavorBoardButton
              id={board.id}
              isFavorite={board.isFavorites}
              invalidateQueries={{
                queryKey: ["workspace-board", workspaceId],
              }}
            >
              {({ isPending, optimisticFavorite, handleToggle }) => (
                <button onClick={handleToggle}>
                  {isPending ? (
                    <Image
                      src="/spinner.svg"
                      alt="spinner"
                      width={20}
                      height={20}
                      className="animate-bounce h-5 w-5 absolute bottom-2 right-2"
                    />
                  ) : (
                    <Star
                      className={`h-5 w-5 absolute bottom-2 right-2 text-yellow-400 hover:scale-110 transition  ${
                        optimisticFavorite
                          ? "fill-yellow-400 hover:fill-transparent"
                          : "hover:fill-yellow-400"
                      }`}
                    />
                  )}
                </button>
              )}
            </FavorBoardButton>
          </Link>
        ))
      )}
    </>
  );
};

export default BoardCard;

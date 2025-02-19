import { Suspense } from "react";
import BoardTitleForm from "../BoardTitleForm";
import BoardOption from "./BoardOption";
import BoardActivity from "./BoardActivity";
import Link from "next/link";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine } from "lucide-react";

interface BoardNavbarProps {
  title: string;
  id: string;
  workspaceId: string;
}

const BoardNavbar = async ({ title, id, workspaceId }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-aligno-800/50 fixed top-12 flex items-center px-6 gpa-x-4 text-aligno-200">
      <BoardTitleForm title={title} id={id} />

      <div className="ml-auto flex items-center gap-6">
        <Suspense fallback={<Spinner />}>
          <BoardActivity id={id} />
        </Suspense>
        <BoardOption id={id} />
        <Link href={`/workspace/${workspaceId}`}>
          <Button variant="transparent" className="flex items-center gap-2">
            <ArrowLeftToLine className="w-4 h-4" />
            <p className="md:block hidden">返回工作區</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BoardNavbar;

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import NavList from "./NavList";

const Navbar = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }

  const workspaces = await db.workspace.findMany({
    where: {
      userId: user.id,
    },
    select: { id: true, title: true },
  });

  const favorBoards = await db.board.findMany({
    where: {
      isFavorites: true,
      workspace: {
        userId: user.id,
      },
    },
    select: {
      id: true,
      title: true,
      imageThumbUrl: true,
      isFavorites: true,
      workspace: {
        select: {
          title: true,
        },
      },
    },
  });

  return (
    <nav className="h-[3rem] px-4 flex items-center w-full justify-between bg-aligno-700 border-b-aligno-600 border border-transparent">
      <NavList workspaces={workspaces} user={user} favorBoards={favorBoards} />
    </nav>
  );
};

export default Navbar;

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
    <nav className="flex h-[3rem] w-full items-center justify-between border border-transparent border-b-aligno-600 bg-aligno-700 px-4">
      <NavList workspaces={workspaces} user={user} favorBoards={favorBoards} />
    </nav>
  );
};

export default Navbar;

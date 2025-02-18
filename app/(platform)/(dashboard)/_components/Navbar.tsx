import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import NavItem from "./NavItem";

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
  });


  
  return (
    <nav className="h-[3rem] px-4 flex items-center w-full justify-between bg-aligno-800">
      <NavItem workspaces={workspaces} user={user} />
    </nav>
  );
};

export default Navbar;

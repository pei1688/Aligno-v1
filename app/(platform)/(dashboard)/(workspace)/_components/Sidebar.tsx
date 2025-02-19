import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SideItem from "./SideItem";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

const Sidebar = async ({ workspaceId }: { workspaceId: string }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  // 同時查詢 workspace 和 workspaces
  const [workspace, workspaces] = await Promise.all([
    db.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        boards: { select: { id: true, title: true, imageThumbUrl: true } },
      },
    }),
    db.workspace.findMany({
      where: { userId: user.id },
    }),
  ]);

  if (!workspace) {
    redirect("/");
  }
  return (
    <Suspense fallback={<Spinner />}>
      <SideItem workspace={workspace} workspaces={workspaces} user={user} />;
    </Suspense>
  );
};

export default Sidebar;

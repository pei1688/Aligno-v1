import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import Sidebar from "../../_components/Sidebar";
import { startCase } from "lodash";

// 讓 Next.js 生成 Metadata
export async function generateMetadata({
  params,
}: {
  params: { workspaceId: string };
}) {
  const workspace = await db.workspace.findUnique({
    where: { id: params.workspaceId },
  });

  return {
    title: startCase(workspace?.title || "Aligno"),
  };
}

const WorkspaceIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) => {
  const { getUser } = getKindeServerSession();
  const userPromise = getUser();

  // 先解析 user，才能用 user.id 查 workspace
  const user = await userPromise;
  if (!user) {
    redirect("/");
  }

  // 同時查詢 workspace 和 workspaces
  const [workspace, workspaces] = await Promise.all([
    db.workspace.findUnique({
      where: { id: params.workspaceId },
      include: {
        boards: { select: { id: true, title: true, imageThumbUrl: true } },
      },
    }),
    db.workspace.findMany({
      where: { userId: user.id }, // 只查詢該使用者的 workspace
    }),
  ]);

  if (!workspace) {
    redirect("/");
  }

  return (
    <div className="flex gap-x-7">
      <div className="">
        <Sidebar
          workspace={workspace}
          workspaces={workspaces}
          user={{ ...user, given_name: user.given_name! }}
        />
      </div>
      <div className="flex-1 md:flex-[3] lg:flex-[4]">{children}</div>
    </div>
  );
};

export default WorkspaceIdLayout;

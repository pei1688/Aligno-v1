import db from "@/lib/db";
import { startCase } from "lodash";
import Sidebar from "./_components/sidebar/SideBar";

// 讓 Next.js 生成 Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  const workspace = await db.workspace.findUnique({
    where: { id: workspaceId },
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
  params: Promise<{ workspaceId: string }>;
}) => {
  const { workspaceId } = await params;
  return (
    <div className="flex w-full min-h-[calc(100vh-10rem)] sm:h-full overflow-hidden">
      <div className="flex-shrink-0 ">
        <Sidebar workspaceId={workspaceId} />
      </div>
      <div className="flex-1 min-w-0 overflow-x-auto">{children}</div>
    </div>
  );
};

export default WorkspaceIdLayout;

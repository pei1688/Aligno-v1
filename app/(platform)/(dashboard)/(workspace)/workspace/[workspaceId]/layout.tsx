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
  return (
    <div className="flex gap-x-7">
      <Sidebar workspaceId={params.workspaceId} />
      <div className="flex-1 md:flex-[3] lg:flex-[4]">{children}</div>
    </div>
  );
};

export default WorkspaceIdLayout;

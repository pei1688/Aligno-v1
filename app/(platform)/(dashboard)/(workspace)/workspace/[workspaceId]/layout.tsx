import db from "@/lib/db";
import { startCase } from "lodash";
import Sidebar from "./_components/sidebar/Side-Bar";

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
    <div className="flex w-full min-h-[calc(100vh-10rem)] sm:h-full overflow-hidden">
      <div className="flex-shrink-0 ">
        <Sidebar workspaceId={params.workspaceId} />
      </div>
      <div className="flex-1 min-w-0 overflow-x-auto">{children}</div>
    </div>
  );
};

export default WorkspaceIdLayout;

import { Separator } from "@/components/ui/separator";
import WorkspaceInfo from "../_components/WorkspaceInfo";
import db from "@/lib/db";
import SettingForm from "./_components/SettingForm";
import { subscription } from "@/lib/subscription";

const SettingPage = async ({ params }: { params: { workspaceId: string } }) => {
  const workspace = await db.workspace.findUnique({
    where: { id: params.workspaceId },
  });

  if (!workspace) {
    return <p className="text-gray-500 text-center mt-8">看板不存在</p>;
  }
  const isPremium = await subscription(params.workspaceId);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 mt-8">
      {/* 工作區資訊區塊 */}
      <div className="w-full lg:w-[300px]">
        <WorkspaceInfo isPremium={isPremium} workspace={workspace} />
      </div>

      {/* 分隔線 */}
      <Separator className="my-6 sm:my-8 border-aligno-400/50 border-t-[0.5px] border-solid" />

      {/* 設定表單區塊 */}
      <div className="w-full">
        <SettingForm workspace={workspace} />
      </div>
    </div>
  );
};

export default SettingPage;

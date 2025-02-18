import ActivityItem from "@/components/ActivityItem";
import db from "@/lib/db";

interface workspaceIdProps {
  workspaceId: string;
}

const ActivityList = async ({ workspaceId }: workspaceIdProps) => {
  const actLogs = await db.activityLog.findMany({
    where: {
      workspaceId,
    },
  });

  return (
    <ol className="space-y-4 mt-4 max-h-[500px] md:max-h-[800px] overflow-auto px-4 sm:px-6 lg:px-32">
      {actLogs.length === 0 ? (
        <p className="text-md text-center text-aligno-300">
          工作區裡沒有發現活動
        </p>
      ) : (
        actLogs.map((act) => <ActivityItem key={act.id} act={act} />)
      )}
    </ol>
  );
};

export default ActivityList;


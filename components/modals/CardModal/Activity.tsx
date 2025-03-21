"use client";

import ActivityItem from "@/components/ActivityItem";
import { Button } from "@/components/ui/button";
import { ActivityLog } from "@prisma/client";
import { ChartNoAxesGantt } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { fetcher } from "@/lib/fetcher";

interface ActivityProps {
  id: string;
}

const Activity = ({ id }: ActivityProps) => {
  const [showAll, setShowAll] = useState(false);

  const { data: activity, isLoading } = useQuery<ActivityLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
    enabled: !!id, // 確保 cardId 存在時才發送請求
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!activity || activity.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-aligno-300">
        <p>尚無活動紀錄</p>
      </div>
    );
  }

  const actToDisplay = showAll ? activity : activity.slice(0, 1);

  return (
    <div className="flex min-h-[300px] w-full flex-col items-start text-aligno-300">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <ChartNoAxesGantt className="mt-0.5 h-5 w-5" />
          <p className="font-semibold">活動</p>
        </div>
        <Button
          className="w-[100px] justify-center"
          variant="gray"
          size="action"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "隱藏活動" : "顯示所有活動"}
        </Button>
      </div>
      <div className="max-h-[250px] w-full overflow-auto">
        <ol className="mt-2 space-y-4">
          {actToDisplay.map((act) => (
            <ActivityItem key={act.id} act={act} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Activity;

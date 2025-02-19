import { CreditCard } from "lucide-react";
import Image from "next/image";

interface WorkProps {
  id: string;
  title: string;
  description: string | null;
  isPremium: boolean;
}
const WorkspaceInfo = ({ workspace }: { workspace: WorkProps }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-4">
        <div className="w-[60px] h-[60px] relative sm:w-[80px] sm:h-[80px]">
          <Image
            src={"https://avatar.vercel.sh/rauchg"}
            alt="vercel"
            sizes="auto"
            className="rounded-md object-cover"
            fill
          />
        </div>
        <div className="space-y-1 flex flex-col">
          <p className="font-semibold text-xl sm:text-2xl">{workspace.title}</p>
          <div className="flex items-center text-xs text-muted-foreground">
            <CreditCard className="h-3 w-3 mr-1" />
            {workspace.isPremium ? "Premium" : "免費"}
          </div>
        </div>
      </div>
      {workspace.description && (
        <div className="text-sm mt-2 sm:text-base">{workspace.description}</div>
      )}
    </div>
  );
};

export default WorkspaceInfo;

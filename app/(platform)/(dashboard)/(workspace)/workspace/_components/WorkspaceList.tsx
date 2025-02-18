import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import db from "@/lib/db";
import { LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
interface User {
  id: string;
}

const WorkspaceList = async ({ id }: User) => {
  const workspaces = await db.workspace.findMany({
    where: {
      userId: id,
    },
  });

  return (
    <div>
      {workspaces.length > 0 ? (
        workspaces.map((workspace) => (
          <Accordion key={workspace.id} type="single" collapsible>
            <AccordionItem value={`item-${workspace.id}`}>
              <AccordionTrigger className="hover:bg-aligno-600 px-2 rounded-md">
                {workspace.title}
              </AccordionTrigger>

              <Link href={`/workspace/${workspace.id}`}>
                <AccordionContent className="px-8 flex items-center gap-2 hover:bg-aligno-600 transition rounded-lg">
                  <LayoutDashboard className="h-4 w-4" />
                  看板
                </AccordionContent>
              </Link>

              <Link href={`/workspace/${workspace.id}/settings`}>
                <AccordionContent className="px-8 flex items-center gap-2 hover:bg-aligno-600 transition rounded-lg">
                  <Settings className="h-4 w-4" />
                  設定
                </AccordionContent>
              </Link>
            </AccordionItem>
          </Accordion>
        ))
      ) : (
        <p className="text-aligno-300">尚未建立任何工作區</p>
      )}
    </div>
  );
};

export default WorkspaceList;

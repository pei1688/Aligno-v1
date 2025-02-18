import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserForm from "./_components/UserForm";
import db from "@/lib/db";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const UserPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userData = await db.user.findUnique({
    where: {
      id: user.id,
    },
    select: { firstName: true, lastName: true },
  });
  return (
    <div>
      <div className="flex flex-col">
        <div className=" flex flec items-center gap-x-4 p-16 py-8">
          <div className="w-[60px] h-[60px] relative ">
            <Image
              src={user.picture || "https://avatar.vercel.sh/rauchg"}
              alt="vercel"
              className="rounded-full object-cover"
              fill
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <p className="font-semibold text-xl">{user.given_name}</p>
            <div className="flex items-center text-xs text-aligno-300">
              @{userData?.firstName}
              {userData?.lastName}
            </div>
          </div>
        </div>
        <div className="px-16">
          <span className="text-sm ">個人檔案</span>
          <Separator className="mb-8 mt-2 border-white/30 border-t-[0.5px] border-solid" />
        </div>
      </div>
      <UserForm user={user} userData={userData!} />
    </div>
  );
};

export default UserPage;
